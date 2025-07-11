Como rodar o projeto: -----

1° - Tenha o Docker, Docker compose e MongoDB compass instalados
2° - No terminal (CMD) como ADMINISTRADOR, execute o comando "git clone https://github.com/ArthurVargaz/ANJUN25_D01_COMPASSPRODUCT"
3° - Após, acesse a pasta do projeto: "cd ANJUN25_D01_COMPASSPRODUCT" e execute este comando: "docker compose up -d"
4° - Abra o MongoDB compass
5° - Crie uma nova conexão em "New Connection" (pode deixar todas as configurações padrão).
6° - Após criar a conexão, clique onde esta escrito "Create database", onde está "Database name" coloque: "compassproduct" ,
e onde está "Collection Name" coloque: "products"
7° - Sempre que fizer alguma operação do CRUD, recarregue a página no MongoDB para atualizar a tabela
8° - Seu banco de dados está pronto
9° - Abra o código do projeto na sua IDE
10° - Para testar as rotas do CRUD, utilize o arquivo "routest.rest" na sua IDE
11° - Para parar o docker, use este comando no terminal: "docker compose stop"
