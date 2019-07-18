# Loopback-next Authentication

Autenticação padrão para loopback-next


## Key para cadastrar

Todas as rotas são protegidas, exceto a de login.

Para criar um User precisa passar uma "key" como parâmetro.

A "key" se encontra em: keys.ts, UserServiceConstants.ADDUSER_SECRET_VALUE. Seu valor é "12345678". Aonde for consumir a API, esse mesmo valor deve estar definido.
