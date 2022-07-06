const dataNascimento = document.querySelector('#nascimento');

dataNascimento.addEventListener('blur', (evento) => {
  validaDataNascimento(evento.target);
})

function validaDataNascimento(input){
  const dataRecebida = new Date(input.value);
  let mensagem = "";

  if(!maiorQue18(dataRecebida)){
    mensagem = 'Você deve ser maoir que 18 anos para se cadastrar'
  }

  input.setCustomValidity(mensagem);
  
}

function maiorQue18(data){
  const dataAtual = new Date();
  const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

  return dataMais18 <= dataAtual;
}

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

9.- Primeiro, nós temos que ter o input para poder adicionar esse evento. Então vou criar uma constante, const dataNascimento = document.querySelector(“#nascimento”). E agora, passar um evento, dataNascimento.addEventListener(), o evento vai ser quando nós perdemos foco de campo, então vai ser um evento blur, e aí nós vamos passar uma função. Recebendo um (evento), posso passar uma arrow function, e dentro dessa função anônima, nós vamos passar o validaDataNascimento(evento.target).*/