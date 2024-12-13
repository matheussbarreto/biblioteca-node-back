export default function tratarErros(erro){
    if(erro.code === 'ENDENT'){
        // throw new Error('Arquivo não encontrado');
        return Error('Arquivo não encontrado');
    } else {
        return 'Erro na aplicação';
    }
}