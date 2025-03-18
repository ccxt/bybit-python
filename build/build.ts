import * as fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { exec, execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


// ##################### helpers ##################### //

function cp(source: string, destination: string): void {
    // check if source is file or dir
    if (!fs.existsSync(source)) {
        throw new Error(`Source file/directory does not exist: ${source}`);
    }
    const stats = fs.statSync(source);
    if (stats.isFile()) {
        // get parent directory
        const parentDir = path.dirname(destination);
        // check if parent directory exists
        if (!fs.existsSync(parentDir)) {
            fs.mkdirSync(parentDir, { recursive: true });
        }
        fs.copyFileSync(source, destination);
        return;
    }
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }
    const files = fs.readdirSync(source);
    for (const file of files) {
        const srcPath = path.join(source, file);
        const destPath = path.join(destination, file);
        cp(srcPath, destPath);
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ################################################### //



class build {

    language:string = 'python';

    exchange:string;
    sourceFolder:string;
    destinationFolder:string;
    downloadAndDelete:boolean;

    constructor(exchange: string, downloadAndDelete: boolean) {
        this.exchange = exchange;
        this.sourceFolder = __dirname +  `/ccxt/`;
        this.destinationFolder = __dirname +  `/../${exchange}/ccxt/`;
        this.downloadAndDelete = downloadAndDelete;
        this.init(exchange);
    }

    async downloadRepo() {
        try {
            execSync('rm -rf ccxt/', { stdio: 'ignore' });
        } catch (ex) {
            execSync('if exist "ccxt" (rmdir /s /q ccxt)'); // for windows (temporarily :)
        }
        execSync ('git clone --depth 1 https://github.com/ccxt/ccxt.git');
    }

    copyFiles (exchange:string): void {
        const sourceDir = this.sourceFolder + '/python/ccxt/';
        const copyList = [
            // exchange files
            `${exchange}.py`,
            `abstract/${exchange}.py`,
            `async_support/${exchange}.py`,
            // base files
            'base',
            'async_support/base',
            '__init__.py',
            'async_support/__init__.py',
            // pro files
            'pro/__init__.py',
            `pro/${exchange}.py`,
            // static dependencies
            'static_dependencies',
        ];
        for (const file of copyList) {
            cp(sourceDir + file,  this.destinationFolder + file);
        }
    }
    
    allExchangesList:string[] = [];

    async setAllExchangesList () {
        this.allExchangesList = fs.readdirSync(__dirname + '/ccxt/ts/src/').filter(file => file.endsWith('.ts')).map(file => file.replace('.ts', ''));  //  [... fs.readFileSync('./ccxt/python/ccxt/__init__.py').matchAll(/from ccxt\.([a-z0-9_]+) import \1\s+# noqa/g)].map(match => match[1]);
        if (this.allExchangesList.length === 0) {
            throw new Error('No exchanges list found');
        }
    }

    regexAll (text: string, array: any[]) {
        for (const i in array) {
            const regexValue = array[i][0]
            const flags = (typeof regexValue === 'string') ? 'g' : undefined
            const regex = new RegExp (regexValue, flags)
            text = text.replace (regex, array[i][1])
        }
        return text
    }

    async cleanInitFile(filePath: string, async = false) {
        let fileContent = fs.readFileSync(filePath, 'utf8');
        for (const id of this.allExchangesList) {
            if (id !== this.exchange) {
                fileContent = this.regexAll (fileContent, [
                    [ new RegExp(`from ccxt\.${id} import ${id}.+\n`), '' ],
                    [ new RegExp(`from ccxt\.async_support\.${id} import ${id}.+\n`), '' ],
                    [ new RegExp(`from ccxt\.pro\.${id} import ${id}.+\n`), '' ],
                    [ new RegExp(`\\s+'${id}',\n`), '' ],
                ]).trim ()
            }
        }
        const importJunction = `import sys\n` + 
                               `import ${this.exchange}.ccxt as ccxt_module\n` + 
                               `sys.modules[\'ccxt\'] = ccxt_module\n\n`;
        fileContent = importJunction + fileContent;
        fs.writeFileSync(filePath, fileContent + '\n');
    }

    creataPackageInitFile () {
        const capitalized = capitalize (this.exchange);
        const cont = '' +
            'import sys\n' +
            `import ${this.exchange}.ccxt as ccxt_module\n` +
            'sys.modules[\'ccxt\'] = ccxt_module\n' +
            '\n' +
            `from ${this.exchange}.ccxt import ${this.exchange} as ${capitalized}Sync\n` +
            `from ${this.exchange}.ccxt.async_support.${this.exchange} import ${this.exchange} as ${capitalized}Async\n` +
            `from ${this.exchange}.ccxt.pro.${this.exchange} import ${this.exchange} as ${capitalized}Ws\n`
        fs.writeFileSync(this.destinationFolder + '/../__init__.py', cont);
    }

    editWsHeaders () {
        const path = this.destinationFolder + `pro/${this.exchange}.py`;
        const fileContent = fs.readFileSync(path, 'utf8');
        const addLine = `from ccxt.async_support import ${this.exchange} as ${this.exchange}Async\n`;
        const newContent = fileContent.replace(/class \w+\(.*?\):/, addLine + `\n\nclass ${this.exchange}(${this.exchange}Async):`);
        fs.writeFileSync(path, newContent);
    }

    globalConfigs: any = {};

    createMetaPackage () {
        const originalPackage = JSON.parse (fs.readFileSync (__dirname + '/ccxt/package.json', 'utf8'));
        const exchangesConfigContent = fs.readFileSync(__dirname + '/global-configs.json', 'utf8');
        this.globalConfigs = JSON.parse(exchangesConfigContent);
        const packageJson = {
            name: this.exchange,
            description: `A Python cryptocurrency trading library for ${this.exchange}`,
            keywords:  [this.exchange].concat (this.globalConfigs.keywords),
        };
        const extended = Object.assign (originalPackage, packageJson);
        extended['repository']['url'] = `https://github.com/ccxt/${this.language}-${this.exchange}.git`;
        // remove all props except
        const neededProps = ['name', 'version', 'description', 'keywords', 'repository', 'readme', 'author', 'license', 'bugs', 'homepage', 'collective', 'ethereum'];
        // remove with inline
        for (const key in extended) {
            if (!neededProps.includes(key)) {
                delete extended[key];
            }
        }
        extended['project_urls'] = {
            'Homepage': 'https://ccxt.com',
            'Documentation': 'https://github.com/ccxt/ccxt/wiki',
            'Discord': 'https://discord.gg/ccxt',
            'Twitter': 'https://twitter.com/ccxt_official',
            'Funding': 'https://opencollective.com/ccxt',
        };
        const stringified = JSON.stringify(extended, null, 4);
        fs.writeFileSync (__dirname + '/../meta.json', stringified);
    }

    capitalize (str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    replaceGlobalRegexes (text: string, array: any[]) {
        let newText = text;
        newText = this.regexAll (newText, [
            ['__exchangeName__', this.exchange],
            ['__ExchangeName__', this.capitalize(this.exchange)],
        ]);
        const exchangeConfig = this.globalConfigs['exchanges'][this.exchange];
        for (const key in exchangeConfig) {
            newText = newText.replace(new RegExp(`${key}`, 'g'), exchangeConfig[key]);
        }
        return newText;
    }

    generateExamples () {
        const destinationDir = __dirname + `/../examples/`;
        cp (__dirname + '/sources/examples/', destinationDir);
        // iterate through files and make replacements
        const files = fs.readdirSync(destinationDir);
        for (const file of files) {
            const filePath = destinationDir + file;
            let fileContent = fs.readFileSync(filePath, 'utf8');
            fileContent = this.replaceGlobalRegexes(fileContent, []);
            fs.writeFileSync(filePath, fileContent);
        }
    }

    generateReadme () {
        const destinationDir = __dirname + `/../README.md`;
        cp (__dirname + '/sources/README.md', destinationDir);
        let fileContent = fs.readFileSync(destinationDir, 'utf8');
        fileContent = this.replaceGlobalRegexes(fileContent, []);
        fs.writeFileSync(destinationDir, fileContent);
    }

    async init (exchange:string) {
        if (this.downloadAndDelete) {
            await this.downloadRepo ();
        }
        this.copyFiles (exchange);
        await this.setAllExchangesList ();
        await this.creataPackageInitFile ();

        await this.cleanInitFile (this.destinationFolder + '__init__.py');
        await this.cleanInitFile (this.destinationFolder + 'async_support/__init__.py');
        await this.cleanInitFile (this.destinationFolder + 'pro/__init__.py');
        this.editWsHeaders ();

        // Remove git dir now (after reading exchanges)
        this.createMetaPackage ();
        this.generateExamples ();
        this.generateReadme ();
        if (this.downloadAndDelete) {
            fs.rmSync(__dirname + '/ccxt/', { recursive: true, force: true });
        }
        console.log ("Done!");
    }
}


// -------------------------------------------------------------------------------- //




const argvs = process.argv.slice(2);
let exchange = argvs[0];
if (!exchange || exchange.includes('--')) {
    const nameFile = __dirname + '/../name';
    if (fs.existsSync(nameFile)) {
        exchange = fs.readFileSync(nameFile, 'utf8').trim();
    }
}
if (!exchange) {
    console.error('Please input exchange name in a "name" file in the root of the project');
    process.exit(1);
}
const donwloadAndDelete = !argvs.includes('--nodownload');
new build(exchange, donwloadAndDelete);
