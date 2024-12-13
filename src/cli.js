import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import tratarErros from './erros/funcoesErros.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', '')
    .option('-d, --destino <string>', '')
    .action((options) => {
        const { texto, destino } = options;

        if(!texto || !destino){
            console.error(chalk.red('Erro: Favor inserir caminho de origem e/ou destino'));
            program.help();
            return;
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try {
            processaArquivo(caminhoTexto, caminhoDestino);
        } catch (erro){
            console.log('Ocorreu um erro no processamento', erro);
        }
    });

program.parse();


function processaArquivo(texto, destino){
    fs.readFile(texto, 'utf-8', (erro, texto) => {
        try {
            if (erro) throw erro
            const resultado = contaPalavras(texto);  
            criaESalvaArquivo(resultado, destino);
        } catch(erro) {
            console.log(tratarErros(erro));
        }
    })
}


async function criaESalvaArquivo(listaPalavras, endereco){
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras); 
    try{
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('Arquivo criado.');
    } catch(erro){
        throw erro;
    }
}