## Aplicação exemplo AngularJS consumindo backend em JAX-RS

### Entendendo a aplicação

**Visão geral:** Todas as funcionalidades da aplicação estão implementadas no browser utilizando o MVC client-side **AngularJS**. Neste exemplo, o backend, escrito em Java com **JAX-RS**, está sendo utilizado somente como um provedor de dados. Observe que o backend também possui validações que impedem a gravação de dados em estado indevido e é muito comum manter regras de negócio sensíveis no lado do servidor.


**1)** Faça download do código para a sua máquina: `git clone https://github.com/soeirosantos/sample-jaxrs-angularjs-2.git`

**2)** Abra o arquivo `src/main/webapp/scripts/app.js`. Este arquivo confiugra nossa aplicação AngularJS com o nome `angularjaxrs`. Estamos associando nossa aplicação a dois módulos do Angular: `route` e `resource`.

Ainda no arquivo app.js, observe como estamos configurando nossas rotas para as views correspondentes. Esse tipo de roteamente realizado no browser é uma funcionalidade básica de qualquer MVC client-side, uma vez que não iremos ao servidor para renderizar novas páginas, alguém precisa ficar responsável por isso.

Repare, ainda, que cada view está associada a um Controller. Essa configuração é importante, pois é através dela que acontece a ligação, de forma totalmente transparente, entre os dados da view e as funcionalidades implementadas no Controller. Mas sobre isso em instantes.

Por fim, nós temos um Controller (o `NavController`) que não está ligado a view nenhuma, ele simplesmente gerencia o comportamento do menu de navegação.

**3)** Agora, abra o arquivo  `src/main/webapp/app.html`. Este arquivo é raiz da nossa aplicação. Durante todo o tempo somente este arquivo ficará aberto no browser e as views e comportamentos da tela serão alterados dinamicamente através da configuração que vimos anteriormente.

Na tag `<html>` vinculamos nossa aplicação Angular ao arquivo `app.html` através da *diretiva* `ng-app`
```html
    <html lang="en" ng-app="angularjaxrs">
```

Através do roteamento que configuramos nossas views serão exbidas na `div#main`:
```html
<div id="main" ng-view>
</div>
```
Aqui utilizamos mais uma diretiva do Angular, a `ng-view`.

O `NavController` não é responsável por nenhuma view específica, ele está associado diretamente ao menu e é responsável por controlar seu comportamento.
```html
<nav class="sidebar-nav" ng-controller="NavController" role="navigation">
    ...
    </div>
</nav>
```

**4)** No diretório `src/main/webapp/views/conta` podemos ver os templates que serão renderizados na div com a diretiva `ng-view`. Abra cada um desses arquivos e observe o uso de diretivas para implementar comportamentos através do Angular. Em especial repare como os campos `input` estão ligados aos controllers através da diretiva `ng-model`.

**5)** Agora vamos olhar os controllers no diretório `src/main/webapp/scripts/controllers`.

Abra cada um dos arquivos e veja as funcionalidades implementadas através de funções JavaScript. Observe que algumas dependências são passadas para o controller como parâmetros da função que define o corpo do controller.

```javascript
angular.module('angularjaxrs').controller('EditContaController', function($scope, $routeParams, $location, ContaResource ) {
    ...
```
Desses parâmetros destacamos o `$scope`, que é utilizado para acessar os elementos referenciados na view, e o `ContaResource`, que é utilizado para abstrair a comunicação com a API Rest.

A ligação que ocorre entre o `$scope` e os elementos da view é uma ligação de mão-dupla, ou seja, toda alteração realizada na view é refletida no controller e, por sua vez, toda alteração em uma variável no controller é automaticamente atualizada na view. Esse processo é conhecido como *two way data binding*.

**6**) Abra o arquivo `src/main/webapp/scripts/services/ContaFactory.js` para ver como configuramos o ContaResource. Para isso estamos utilizando o módulo `resource` do AngularJS, que implementa funcionalidades que abstraem e facilitam a comunicação com a API Rest.

**Dica:** Embora o módulo `resource` seja *padrão* do AngularJS e possua funcionalidades bem interessantes, se você for implementar uma aplicação AngularJS você deveria avaliar, também, o plugin `restangular` - um substituto de peso ao `resource`.

**7**) Em `src/main/webapp/scripts/directives` e `src/main/webapp/scripts/filters` nós implementamos alguns recursos um pouco mais avançados de Angular. No arquivo `datapicker.js` nós temos nossa própria diretiva que pode ser utilizada para tratar o campos de datas.

### Como rodar a aplicação

Para executar a aplicação basta importar o projeto no eclipse como um projeto Maven existente. Eu utilizei o Wildfly para executar, mas acredito que você não terá problemas para rodar a aplicação no JBoss 7.1.

### Considerações finais

O setup e o esqueleto desta aplicação foi feito com o JBoss Forge, utilizando o plugin para AngularJS. Realizei algumas customizações e melhorias pontuais, com modificações mais significativas na diretiva datapicker.
