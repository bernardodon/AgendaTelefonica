angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $http){
    $scope.app = "Lista Telefonica";
    $scope.contatos = [];
    $scope.operadoras = [];

    var carregarContatos = function() {
        $http.get("http://localhost:3412/contatos").then(function(data){
            $scope.contatos = data.data;
        }).catch(function(data, status) {
            $scope.message = "Aconteceu um problema: " + data;
        })
    }

    var carregarOperadoras = function() {
        $http.get("http://localhost:3412/operadoras").then(function(data) {
            $scope.operadoras = data.data;
        })
    }
    
    $scope.adicionarContato = function(contato) { 
        contato.data = new Date();
        $http.post("http://localhost:3412/contatos", contato).then(function() {
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