x/*const dataNascimento = document.querySelector('#nascimento');

dataNascimento.addEventListener('blur', (evento) => {
  validaDataNascimento(evento.target);
})*/

export function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo de nome não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.'
    },
    senha: {
        valueMissing: 'O campo de senha não pode estar vazio.',
        patternMismatch: 'A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos.'
    },
    dataNascimento: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        customError: 'O CPF digitado não é válido.' 
    }
}

const validadores = {
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCPF(input)
}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })
    
    return mensagem
}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)
    let mensagem = ''

    if(!maiorQue18(dataRecebida)) {
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
    }

    input.setCustomValidity(mensagem)
}

function maiorQue18(data) {
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual
}

function validaCPF(input) {
    const cpfFormatado = input.value.replace(/\D/g, '')
    let mensagem = ''

    if(!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {
        mensagem = 'O CPF digitado não é válido.'
    }

    input.setCustomValidity(mensagem)
}

function checaCPFRepetido(cpf) {
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]
    let cpfValido = true

    valoresRepetidos.forEach(valor => {
        if(valor == cpf) {
            cpfValido = false
        }
    })

    return cpfValido
}

function checaEstruturaCPF(cpf) {
    const multiplicador = 10

    return checaDigitoVerificador(cpf, multiplicador)
}

function checaDigitoVerificador(cpf, multiplicador) {
    if(multiplicador >= 12) {
        return true
    }

    let multiplicadorInicial = multiplicador
    let soma = 0
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('')
    const digitoVerificador = cpf.charAt(multiplicador - 1)
    for(let contador = 0; multiplicadorInicial > 1 ; multiplicadorInicial--) {
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial
        contador++
    }

    if(digitoVerificador == confirmaDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplicador + 1)
    }

    return false
}

function confirmaDigito(soma) {
    return 11 - (soma % 11)
}


// 123 456 789 09

// let soma = (11 * 1) + (10 * 2) + (9 * 3) ... (2 * 0)

// let digitoVerificador = 11 - (soma % 11)

/*Explicação do codigo:

1.-  Criar uma function validaDataNascimento, que vai receber dentro dessa função um input, que vai ser justamente o input que nós vamos receber do formulário.

2.- O valor que nós recebemos desse input, ele vem como uma string, então nós temos que transformar o valor dessa string em um calendário. Vou colocar uma constante const dataRecebida = new Date(input.value), porque eu não quero pegar input inteiro, eu quero só pegar o valor do input.

3.- Criar uma function que vai comparar as datas:
function maiorQue18 (data), vou aproveitar e chamar maiorQue18(data) na nossa função principal. Dentro dessa função maiorQue18, nós precisamos da data de hoje, então eu vou criar outra constante, const dataAtual, e vou criar um new Date(). Se nós queremos passar a data de hoje, nós criamos um new Date sem passar valor nenhum dentro, aí ele vai colocar automaticamente data de hoje.

4.- O próximo passo para fazer a comparação, é pegar a data que nós vamos receber do input, e somar, no ano, 18 anos. Porque o JavaScript permite que nós façamos comparação entre datas, se elas são maiores, menores, ou iguais entre si.

5.- Criar outra data, agora uma data que vai receber a que nós recebemos do formulário, somando ao ano 18 anos. Então const dataMais18 = new Date (), e agora dentro do new Date, temos que passar no formato correto que o JavaScript espera. Que é ano, mês e dia
const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());
Como retorno dessa função, nós podemos fazer a comparação, return dataMais18, checar se ela é menor ou igual à data de hoje, <= dataAtual.

6.- Se ela realmente for menor ou igual à data atual, quer dizer que a pessoa é maior de 18 anos, ou seja, vai retornar verdadeiro. Se a dataMais18 for maior que a data atual, quer dizer que a pessoa não é maior de idade, não é maior que 18 anos, então quer dizer que vai ser o retorno falso.

7.- Estamos recebendo verdadeiro ou falso, mas nós ainda não fizemos uma validação ainda do formulário, do campo. Porque para fazer essa validação, para o navegador entender que existe algum erro naquele campo, nós temos que usar uma propriedade do input chamada setCustomValidity, input.setCustomValidity, e o valor desse setCustomValidity é uma mensagem, é uma string.
Esse input estiver válido, a mensagem que nós vamos passar uma stringvazia, (mensagem). Então nós podemos até criar essa string, essa variável, let mensagem = ‘’.
Caso a pessoa não seja maior que 18 anos, ela tem que mandar uma mensagem de erro. Ou seja, nós temos que passar, por exemplo, mensagem = “Você deve ser maior que 18 anos para se cadastrar”. Mas essa mensagem só deve ser escrita se a pessoa for menor que 18 anos. Então nós podemos colocar uma condição na linha, if (maiorQue18(dataRecebida)) e caso ela seja falsa, ela troca a mensagem para “Você deve ser maior que 18 anos para se cadastrar”.

8.-Dentro do nosso if, se for verdadeiro, ela vai cair nessa condição, e não pode ser. Ela tem que cair na condição quando for falsa. Então, no começo, antes de escrever a função na linha 5, eu coloco uma !. Vai ficar if(!maiorQue18(dataRecebida)), a mensagem vai ser “Você deve ser maior que 18 anos para se cadastrar”. Caso contrário, a mensagem será nula, então o campo está ok.
Porém, nós não atribuímos essa função a nada ainda, então ela não vai ser chamada para fazer validação. O que nós podemos fazer é colocar um evento dentro do input para que toda vez que ele perca o foco, a função seja chamada.

9.- Primeiro, nós temos que ter o input para poder adicionar esse evento. Então vou criar uma constante, const dataNascimento = document.querySelector(“#nascimento”). E agora, passar um evento, dataNascimento.addEventListener(), o evento vai ser quando nós perdemos foco de campo, então vai ser um evento blur, e aí nós vamos passar uma função. Recebendo um (evento), posso passar uma arrow function, e dentro dessa função anônima, nós vamos passar o validaDataNascimento(evento.target).

10.- Criaremos função genérica que vai ser chamada para todos os inputs, e aí nós fazemos uma verificação para saber qual é o tipo de input e qual função deve ser chamada dependendo desse tipo de input. Vou colocar, na linha 1, uma function valida(input)

E agora nós temos que saber que tipo de input que é esse.

11.- Então eu vou criar uma const tipoDeInput = input.dataset para poder acessar os data atributes de um input ou de algum elemento, nós precisamos usar o de dataset. E agora qual dos data atributes daquele input nós queremos pegar? Embora nós só tenhamos um, nós temos que deixar explícito qual deles que é. Então vai ser tipo.

12.- Como nós podemos ter vários tipos de input, é interessante criarmos um objeto que vai conter os diversos tipos de validações que nós temos no nosso arquivo de validação. Então, na linha 5, vou criar uma constante chamada validadores, que vai ser um objeto e agora, dependendo do tipo de input, nós temos uma função diferente.

13.- Então, no caso nós temos uma data de nascimento data, DataNascimento: input, nós vamos passar um input e agora vamos fazer uma arrow function => validaDataNascimento(input).

14.- Só que agora, para nós podermos realmente chamar essa função, nós temos que criar uma condição que vai fazer exatamente essa comparação, esse tipo de input está dentro de validadores? Então para isso, nós vamos criar um if dentro da função valida e nós vamos verificar se dentro do validadores nós temos o tipoDeInput.

Se tiver, tudo certo. Então quando nós pegamos esse validadores pegando o tipo de validador certo, com tipoDeInput certo, executando a função passando o input. A função que vai ser chamada, vai ser a função relacionada ao tipoDeInput. Só que essa função não está sendo chamada em nenhum lugar. Vamos deixar genérico para que outras aplicações também consigam utilizar essa função, nós vamos criar um outro arquivo que vai importar essa função de valida. Então antes de criar esse novo arquivo, eu vou exportar essa função valida.

15.- antes de escrever function, eu vou escrever export e agora, salvei o arquivo validação.js, e agora vou criar um novo arquivo dentro da pasta “js”, chamado “app.js”.

E nesse “app.js”, nós vamos importar, usar o import {}, entre as chaves eu vou passar a função que nós queremos importar, que é a valida} from, que é de onde que nós queremos pegar, que é do arquivo ”./validacao.js”.

E nós queremos executar a função valida para todos os inputs, porque dentro do valida nós já fazemos a verificação de qual tipo de input nós estamos recebendo.

Então vou criar uma constante, chamada inputs, no plural, é igual a um document.querySelectorAll, porque agora nós queremos pegar todos os inputs, então querySelectorAll. E como nós não temos restrições para o tipo de input, nós queremos todos os inputs, nós vamos usar o seletor de tag, então só input mesmo.

E agora com esse input, nós vamos fazer um laço de repetição e adicionar um evento de blur, como nós fizemos para data de nascimento para todos os inputs. Então agora, inputs.forEach, então agora para cada input que nós temos, nós vamos chamar pegar o input.addEventListener(‘blur’), e a função passando o evento.

E agora, nós vamos chamar a função valida() passando o evento.target. E agora nós vamos chamar função de valida para cada input que nós temos dentro do nosso formulário.

E dependendo do tipo de input, ele vai executar a função adequada. Por enquanto nós temos para data de nascimento, para os outros inputs nada vai acontecer.*/