Acesso a serviços externos a aplicação, APIs

mongoose.connect(URI)
const connection = await createConnection(URI).asPromise()

Podemos nos conectar ao MongoDB usando a conexão padrão do Mongoose.
O Mongoose cria uma conexão padrão quando você chama mongoose.connect(). 
Você pode acessar a conexão padrão usando mongoose.connection.

Você pode precisar de múltiplas conexões com o MongoDB por vários motivos. 
Um motivo é se você tiver vários bancos de dados ou vários clusters MongoDB.
A função mongoose.createConnection() usa os mesmos argumentos que mongoose.connect() e retorna uma nova conexão.