let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const form = document.querySelector("#form");
const lista = document.querySelector("#lista");

function mostrar() {
    lista.innerHTML = "";

    produtos.forEach((p, i) => {
        const card = document.createElement("div");
        card.className = "produto";

        card.innerHTML = `
            <h3></h3>
            <p></p>
            <div class="preco"></div>
        `;

        card.querySelector("h3").textContent = p.nome;
        card.querySelector("p").textContent = p.descricao;
        card.querySelector(".preco").textContent =
            p.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.onclick = () => {
            document.querySelector("#id").value = i;
            document.querySelector("#nome").value = p.nome;
            document.querySelector("#descricao").value = p.descricao;
            document.querySelector("#preco").value = p.preco;
            document.querySelector("#titulo").textContent = "Editar produto";
            document.querySelector("#formulario").scrollIntoView({ behavior: "smooth" });
        };

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.onclick = () => {
            if (confirm("Deseja excluir este produto?")) {
                produtos.splice(i, 1);
                salvar();
            }
        };

        card.append(editar, excluir);
        lista.appendChild(card);
    });
}

function salvar() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    mostrar();
}

form.onsubmit = (e) => {
    e.preventDefault();

    const id = document.querySelector("#id").value;
    const produto = {
        nome: document.querySelector("#nome").value.trim(),
        descricao: document.querySelector("#descricao").value.trim(),
        preco: Number(document.querySelector("#preco").value)
    };

    if (!produto.nome || !produto.descricao || produto.preco <= 0) return;

    if (id === "") {
        produtos.push(produto);
    } else {
        produtos[id] = produto;
    }

    salvar();
    form.reset();
    document.querySelector("#id").value = "";
    document.querySelector("#titulo").textContent = "Cadastrar produto";
};

document.querySelector("#cadastro").onclick = () => {
    document.querySelector("#formulario").scrollIntoView({ behavior: "smooth" });
};

mostrar();
