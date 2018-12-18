document.getElementById('send').addEventListener('click', function() { parent.ebfFlowExecute('Nova Sofia - Enviar mensagem');});
document.getElementById('lista').addEventListener('change', function() { parent.ebfFlowExecute('Nova Sofia - Ao modificar pergunta');});
document.getElementById('MenuNew2').addEventListener('click', function() { parent.ebfFlowExecute('Nova Sofia - Deletar Conversa');});
document.getElementById('MenuNew1').addEventListener('click', function() { parent.ebfFlowExecute('Nova Sofia - Mostrar lista de contexto');});
document.getElementById('close').addEventListener('click', function() { parent.ebfFlowExecute('Nova Sofia - Mostrar lista de contexto');});
document.getElementById('searchfield').addEventListener('keyup', function() { parent.ebfFlowExecute('Nova sofia - Pesquisar contexto');});
document.getElementById('MenuNew3').addEventListener('click', function() { parent.ebfFlowExecute('Nova Sofia - Conversa Inicial menu');});
document.getElementById('searchimg').addEventListener('click', function() { parent.ebfFlowExecute('Nova Sofia - Agenda Criar Menu Novo', parent.ebfListParamsCreate("N"));});
