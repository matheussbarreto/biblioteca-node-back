function filtraOcorrencias(paragrafo){
    return Object.keys(paragrafo).filter(chave => paragrafo[chave] > 1)
}

function montaSaidaArquivo(listaPalavras){
    let textoFinal = '';
    listaPalavras.forEach((paragrafo, indice) => {
        const duplicadas = filtraOcorrencias(paragrafo).join(', ');
        if(duplicadas !== ''){
            textoFinal += `Palavras duplicadas no paragrafo ${indice + 1}: ${duplicadas}. \n`

        }else{
            textoFinal += `Paragrafo ${indice + 1} não possui palavras duplicadas. \n`
        }
    })

    return textoFinal;
}

export { montaSaidaArquivo };