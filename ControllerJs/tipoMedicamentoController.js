function limparForm() {
    var fdados = document.getElementById("ftipomedicamento");
    fdados.nome.value = "";
    fdados.formaFarmaceutica.value = "";
    fdados.descricao.value = "";
}


function validarCampos() {
    const nome = document.getElementById("nome").value;
    const formaFarmaceutica = document.getElementById("formaFarmaceutica").value;
    const descricao = document.getElementById("descricao").value;

    if (nome !== "" && formaFarmaceutica !== "" && descricao !== "") {
        cadMedicamento();
    } else {
        alert("Campo(s) Não Preenchido(s)");
    }
    limparForm();
}

function cadMedicamento() {
    
    var ftipomedicamento = document.getElementById("ftipomedicamento");
    var formData = new FormData(ftipomedicamento);
    var cod = document.getElementById("codMedicamento").value;
    if(cod) // existe, atualiza
    {
        const URL = "http://localhost:8080/apis/tipo-medicamento/atualizar"
        fetch(URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT', body: formData
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                alert("Medicamento Alterado Com Sucesso");
                ftipomedicamento.reset();
            })
            .catch((error) => console.error(error))

    }
    else
    {
        const URL = "http://localhost:8080/apis/tipo-medicamento/gravar"
        fetch(URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST', body: formData
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                alert("Medicamento Cadastrado Com Sucesso");
                ftipomedicamento.reset();
            })
            .catch((error) => console.error(error))
    }
}

function buscarMedicamento() {
    let filtro = document.getElementById("filtro").value
    const resultado = document.getElementById("resultado");
    if(filtro.length > 0) // busca com filtro
    {
        const url = "http://localhost:8080/apis/tipo-medicamento/buscar/" + filtro;
        fetch(url, {
            method: 'GET', redirect: "follow"
        })
        .then((response) => {
            return response.text();
        })
        .then(function (text) {
            var json = JSON.parse(text); // Converte a resposta JSON

            var table = "<table border='1'>"; // Começa a tabela com uma borda simples
            
        
            for (let i = 0; i < json.length; i++) {
                table += `<tr>
                        <td>${json[i].codMedicamento}</td>
                        <td>${json[i].nome}</td>
                        <td>${json[i].formaFarmaceutica}</td>
                        <td>${json[i].descricao}</td>
                        <td><button type="button" onclick='excluirMedicamento(${json[i].codMedicamento})'>Excluir</button></td>
                        <td><button type="button" onclick='alterarMedicamento(${json[i].codMedicamento})'>Alterar</button></td>
                      </tr>`;
            }
            table += "</table>";
            resultado.innerHTML = table; // Exibe a tabela no elemento "resultado"
        })
        .catch(function (error) {
            console.error(error); // Exibe erros, se houver
        });
    }
    else
    {
        const url = "http://localhost:8080/apis/tipo-medicamento/buscar/%20";
        fetch(url, {
            method: 'GET', redirect: "follow"
        })
        .then((response) => {
            return response.text();
        })
        .then(function (text) {
            var json = JSON.parse(text); // Converte a resposta JSON

            var table = "<table border='1'>"; // Começa a tabela com uma borda simples
            for (let i = 0; i < json.length; i++) {
                table += `<tr>
                        <td>${json[i].codMedicamento}</td>
                        <td>${json[i].nome}</td>
                        <td>${json[i].formaFarmaceutica}</td>
                        <td>${json[i].descricao}</td>
                        <td><button type="button" onclick='excluirMedicamento(${json[i].codMedicamento})'>Excluir</button></td>
                        <td><button type="button" onclick='editarMedicamento(${json[i].codMedicamento})'>Alterar</button></td>

                      </tr>`;
            }
            table += "</table>";
            resultado.innerHTML = table; // Exibe a tabela no elemento "resultado"
        })
        .catch(function (error) {
            console.error(error); // Exibe erros, se houver
        });
    }
}

function excluirMedicamento(id) 
{

    const confirmacao = confirm("Tem certeza que deseja excluir este medicamento ?");
    if (confirmacao)
    {
        const URL = "http://localhost:8080/apis/tipo-medicamento/excluir/" + id;

        fetch(URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                alert("Medicamento Excluido Com Sucesso");
                window.location.reload();
            })
            .catch((error) => console.error("Erro ao excluir o medicamento:", error));
    } 
    
}

function editarMedicamento(id) {
    
    window.location.href = "../TelasCadastros/cadTipoMedicamento.html?codMedicamento="+id;
}

function buscarMedicamentoPeloId(id) {
    
    const URL = "http://localhost:8080/apis/tipo-medicamento/buscar-id/"+id;
    var ftipomedicamento = document.getElementById("ftipomedicamento");

    fetch(URL, {
        headers: {
            'Accept': 'application/json'
        },
        method: 'GET'
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao buscar o medicamento: " + response.status);
            }
            return response.json();
        })
        .then((json) => {
            document.getElementById('codMedicamento').value = id;
            document.getElementById('nome').value = json.nome;
            document.getElementById('formaFarmaceutica').value = json.formaFarmaceutica;
            document.getElementById('descricao').value = json.descricao;
        })
        .catch((error) => {
            console.error("Erro ao buscar o medicamento:", error);
            alert("Erro ao buscar o medicamento.");
        });
}

