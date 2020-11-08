angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $http, contatosAPI, operadorasAPI, serialGenerator){
    $scope.app = "Lista Telefonica";
    $scope.contatos = [];
    $scope.operadoras = [];

    var carregarContatos = function() {
        contatosAPI.getContatos().then(function(data){
            $scope.contatos = data.data;
        }).catch(function(data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        })
    }

    var carregarOperadoras = function() {
        operadorasAPI.getOperadoras().then(function(data) {
            $scope.operadoras = data.data;
        })
    }
    
    $scope.adicionarContato = function(contato) { 
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContato(contato).then(function() {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        })
    }

    $scope.apagarContato = function(contatos){
        $scope.contatos = contatos.filter(function (contato){
            if(!contato.selecionado) return contato;
        })
    }
    
    $scope.isContatoSelecionado = function(contatos) {
        return $scope.contatos.some(function(contato) {
            return contato.selecionado
        })
    }

    $scope.ordenarPor = function(criterio) {
        $scope.criterioDeOrdenacao = criterio;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }

    carregarOperadoras()
    carregarContatos();
})