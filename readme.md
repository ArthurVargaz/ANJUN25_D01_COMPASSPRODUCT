Como rodar o projeto: -----

1° - Tenha o Docker, Docker compose e MongoDB Compass instalados
2° - Inicie o Docker desktop no seu computador
3° - No terminal (CMD) como ADMINISTRADOR, execute o comando "git clone https://github.com/ArthurVargaz/ANJUN25_D01_COMPASSPRODUCT"
4° - Após, acesse a pasta do projeto: "cd ANJUN25_D01_COMPASSPRODUCT" e execute este comando: "docker-compose up -d"
5° - Abra o MongoDB compass
6° - Crie uma nova conexão em "New Connection" (pode deixar todas as configurações padrão).
7° - Após criar a conexão, clique onde esta escrito "Create database", onde está "Database name" coloque: "compassproduct" ,
e onde está "Collection Name" coloque: "products"
8° - Sempre que fizer alguma operação do CRUD, recarregue a página no MongoDB para atualizar a tabela
9° - Seu banco de dados está pronto
10° - Abra o código do projeto na sua IDE
11° - Para testar as rotas do CRUD, utilize o arquivo "routest.rest" na sua IDE
12° - Para parar o docker, use este comando no terminal: "docker-compose stop"
