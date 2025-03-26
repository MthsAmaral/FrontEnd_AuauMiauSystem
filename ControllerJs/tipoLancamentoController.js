// função para CADASTRO -> POST
function cadTpLanc() {
    const URL = "http://localhost:8080/apis/tipo-lancamento/gravar";
    const ftipolancamento = document.getElementById("ftipolancamento");
    const formData = new FormData(ftipolancamento);

    fetch(URL, {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((json) => {
            alert("Resposta do servidor: " + JSON.stringify(json));
            ftipolancamento.reset();
        })
        .catch((error) => console.error("Erro ao enviar dados:", error));
}

// função para BUSCA -> GET
// pega os tipos de lançamento de acordo a algum filtro
function getTpLancFiltro(filtro) {
    const url = "http://localhost:8080/apis/tipo-lancamento/buscar/" + filtro;

    fetch(url, { method: 'GET', redirect: "follow" })
        .then((response) => {
            return response.text();
        })
        .then(function (text) {
            var json = JSON.parse(text); // Converte a resposta JSON

            var table = "<table border='1'>"; // Começa a tabela com uma borda simples
            table += `
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Excluir</th>
                    <th>Alterar</th>
                </tr>`;

            for (let i = 0; i < json.length; i++) {
                table += `
                    <tr>
                        <td>${json[i].cod}</td>
                        <td>${json[i].descricao}</td>
                        <td onclick='delTpLanc(${json[i].id})'>X</td>
                        <td onclick='updTpLanc(${json})'>Alterar</td>
                    </tr>`;
            }
            table += "</table>";
            document.getElementById("resultado").innerHTML = table; // Exibe a tabela no elemento "resultado"
        })
        .catch(function (error) {
            console.error(error); // Exibe erros, se houver
        });
}

// outra função para BUSCA -> GET
// buscar algum tipo pelo seu ID
function getTpLancId(id) {
    const url = "http://localhost:8080/apis/tipo-lancamento/buscar-id/" + id;

    fetch(url, { method: 'GET', redirect: "follow" })
        .then((response) => {
            return response.text();
        })
        .then(function (text) {
            var json = JSON.parse(text); // Converte a resposta JSON

            var table = "<table border='1'>"; // Começa a tabela com uma borda simples
            table += `
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Excluir</th>
                    <th>Alterar</th>
                </tr>`;

            for (let i = 0; i < json.length; i++) {
                table += `
                    <tr>
                        <td>${json[i].cod}</td>
                        <td>${json[i].descricao}</td>
                        <td onclick='delTpLanc(${json[i].id})'>X</td>
                        <td onclick='updTpLanc(${json})'>Alterar</td>
                    </tr>`;
            }
            table += "</table>";
            document.getElementById("resultado").innerHTML = table; // Exibe a tabela no elemento "resultado"
        })
        .catch(function (error) {
            console.error(error); // Exibe erros, se houver
        });
}

// função para DELETAR -> DELETE
// breve explicação: nesse exemplo é mandado por parâmetro o respectivo elemento a ser excluído
function delTpLanc(id){
    const URL = "http://localhost:8080/apis/tipo-lancamento/excluir/" + id;

    fetch(URL, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((json) => {
            alert("Resposta do servidor: " + JSON.stringify(json));
        })
        .catch((error) => console.error("Erro ao DELETAR a linha", error));
}

// função para ATUALIZAR -> PUT
// nessa função o objeto JSON para ser atualizado é passado por parâmetro
function updTpLanc(lancForm){
    const URL = "http://localhost:8080/apis/tipo-lancamento/atualizar";

    const formData = new FormData(lancForm);

    fetch(URL, {
        method: 'PUT',
        body: formData,
    })
        .then((response) => response.json())
        .then((json) => {
            alert("Resposta do servidor: " + JSON.stringify(json));
        })
        .catch((error) => console.error("Erro ao ATUALIZAR dados:", error));
}
