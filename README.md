# Loopback-next Authentication

Autenticação padrão para loopback-next


## Key para cadastrar

Todas as rotas são protegidas, exceto a de login.

Para criar um User precisa passar uma "key" como parâmetro.

A "key" se encontra em: keys.ts, UserServiceConstants.ADDUSER_SECRET_VALUE. Seu valor é "12345678". Aonde for consumir a API, esse mesmo valor deve estar definido.

## Salvando User

Como o User tem o ser user_role, não está no método de User.create cadastrar os dados de sua respectiva role. isso fica a cargo de quem consome a API. Ao cdastrar o User, recebe seu ID e informa os dados necessários para criar a próxima entidade.
