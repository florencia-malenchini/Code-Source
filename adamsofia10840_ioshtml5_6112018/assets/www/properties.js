/*SYSTEM PROPERTIES*/
function GetSystemProperties() {
    var Map;
    var FormList;
    var FormMap;
    var ComponentList;
    var ComponentMap;
    
    //  Create Map
    
    Map = ebfMapCreateObject();
        
    //  Create Tables Map
    
    TablesMap = ebfMapCreateObject();
        
    //  Add Sync Server to Map

    ebfMapAddObject(Map, "SyncServer", "");

    //  Add Tables Map to Map
    
    ebfMapAddObject(Map, "Table Info", TablesMap);

    ColumnsMap = ebfMapCreateObject();

    ebfMapAddObject(TablesMap, "WCH_CONFIGURACAO_INTERNA", ColumnsMap);

    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_CON_ID", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_CON_ID");
    ebfMapAddObject(PropertiesMap, "GENERATED", "true");
    ebfMapAddObject(PropertiesMap, "LENGTH", "32");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "false");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "integer");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "URL", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "URL");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "400");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "__RUNNER__USER", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "__RUNNER__USER");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "20");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "__RUNNER__OPERATION", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "__RUNNER__OPERATION");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "1");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "__RUNNER__UPDATE", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "__RUNNER__UPDATE");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "TYPE", "datetime");
    ColumnsMap = ebfMapCreateObject();

    ebfMapAddObject(TablesMap, "WCH_CONTEXTO", ColumnsMap);

    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_CON_ID", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_CON_ID");
    ebfMapAddObject(PropertiesMap, "GENERATED", "true");
    ebfMapAddObject(PropertiesMap, "LENGTH", "32");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "false");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "integer");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_CON_DESCRICAO", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_CON_DESCRICAO");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "100");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "false");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_CON_PADRAO", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_CON_PADRAO");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "1");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_CON_URL", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_CON_URL");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "200");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_CON_WORKSPACE", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_CON_WORKSPACE");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "100");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH__TA_ICONE", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH__TA_ICONE");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "29");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_TA_RESUMO", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_TA_RESUMO");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "8000");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_APP_MODE", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_APP_MODE");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "29");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "__RUNNER__USER", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "__RUNNER__USER");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "20");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "__RUNNER__OPERATION", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "__RUNNER__OPERATION");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "1");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "__RUNNER__UPDATE", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "__RUNNER__UPDATE");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "TYPE", "datetime");
    ColumnsMap = ebfMapCreateObject();

    ebfMapAddObject(TablesMap, "WCH_MENSAGEM", ColumnsMap);

    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_MEN_ID", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_MEN_ID");
    ebfMapAddObject(PropertiesMap, "GENERATED", "true");
    ebfMapAddObject(PropertiesMap, "LENGTH", "32");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "false");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "integer");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_MEN_MENSAGEM", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_MEN_MENSAGEM");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "0");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "false");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_MEN_DATA_HORA", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_MEN_DATA_HORA");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "datetime");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_CON_ID", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_CON_ID");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "32");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "integer");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_MEN_USUARIO", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_MEN_USUARIO");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "20");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_MEN_ID_AUX", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_MEN_ID_AUX");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "200");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "__RUNNER__USER", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "__RUNNER__USER");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "20");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "__RUNNER__OPERATION", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "__RUNNER__OPERATION");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "1");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "__RUNNER__UPDATE", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "__RUNNER__UPDATE");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "TYPE", "datetime");
    ColumnsMap = ebfMapCreateObject();

    ebfMapAddObject(TablesMap, "WCH_USUARIO", ColumnsMap);

    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_USU_ID", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_USU_ID");
    ebfMapAddObject(PropertiesMap, "GENERATED", "true");
    ebfMapAddObject(PropertiesMap, "LENGTH", "32");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "false");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "integer");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_USU_PUSH_ID", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_USU_PUSH_ID");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "200");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "__RUNNER__USER", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "__RUNNER__USER");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "20");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "__RUNNER__OPERATION", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "__RUNNER__OPERATION");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "1");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "__RUNNER__UPDATE", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "__RUNNER__UPDATE");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "TYPE", "datetime");
    ColumnsMap = ebfMapCreateObject();

    ebfMapAddObject(TablesMap, "WCH_WATSON", ColumnsMap);

    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_WAT_ID", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_WAT_ID");
    ebfMapAddObject(PropertiesMap, "GENERATED", "true");
    ebfMapAddObject(PropertiesMap, "LENGTH", "32");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "false");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "integer");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_WAT_CONVERSA", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_WAT_CONVERSA");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "0");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "false");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "WCH_CON_ID", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "WCH_CON_ID");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "32");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "PRECISION", "");
    ebfMapAddObject(PropertiesMap, "SCALE", "");
    ebfMapAddObject(PropertiesMap, "TYPE", "integer");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "__RUNNER__USER", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "__RUNNER__USER");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "20");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "__RUNNER__OPERATION", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "__RUNNER__OPERATION");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "1");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "TYPE", "string");
    PropertiesMap = ebfMapCreateObject();

    ebfMapAddObject(ColumnsMap, "__RUNNER__UPDATE", PropertiesMap);

    ebfMapAddObject(PropertiesMap, "FRIENDLY_NAME", "__RUNNER__UPDATE");
    ebfMapAddObject(PropertiesMap, "GENERATED", "false");
    ebfMapAddObject(PropertiesMap, "LENGTH", "");
    ebfMapAddObject(PropertiesMap, "NULLABLE", "true");
    ebfMapAddObject(PropertiesMap, "TYPE", "datetime");

    //  Create Form List
    
    FormList = ebfMapCreateObject();
        
    //  Add Form Map List to Map

    ebfMapAddObject(Map, "forms", FormList);
        
    //  Add Form Map List to Map
    
    ebfMapAddObject(Map, "syscode", "WCH");

    FormMap = ebfMapCreateObject();

    EventList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "events", EventList);

    ebfMapAddObject(FormList, "{EE15FB32-E767-4A8D-8656-7FC93BF58E4F}", FormMap);

    ebfMapAddObject(FormMap, "FNT_CAMPOCHAVE", "wch_usu_id");

    ebfMapAddObject(FormMap, "FNT_CAMPOPESQUISA", "wch_usu_push_id");

    ebfMapAddObject(FormMap, "FNT_SQLSELECT", "Select\n  wch_usuario.wch_usu_id,\n  wch_usuario.wch_usu_push_id\nFrom\n  wch_usuario\n/*WHERE_NEW*/\n/*ORDER_NEW*/\n");

    ebfMapAddObject(FormMap, "FNT_SQLUPDATE", "\n");

    ebfMapAddObject(FormMap, "FNT_TABELA", "WCH_USUARIO");

    ebfMapAddObject(FormMap, "GUID", "{EE15FB32-E767-4A8D-8656-7FC93BF58E4F}");

    ebfMapAddObject(FormMap, "IMG_ALTERAR", "2");

    ebfMapAddObject(FormMap, "IMG_EXCLUIR", "8");

    ebfMapAddObject(FormMap, "IMG_INCLUIR", "1");

    ComponentList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "components", ComponentList);

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKEREDIT", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "WCH_USU_PUSH_ID");

    ebfMapAddObject(ComponentMap, "Descricao", "Push_ID");

    ebfMapAddObject(ComponentMap, "Type", "E");

    ebfMapAddObject(ComponentMap, "datafield", "WCH_USU_PUSH_ID");

    ebfMapAddObject(ComponentMap, "description", "Push_ID");

    ebfMapAddObject(ComponentMap, "name", "TMAKEREDIT");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "MakerHidden8829dd6eecc59cd3276117cf77a1a911", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "wch_usu_id");

    ebfMapAddObject(ComponentMap, "Type", "Z");

    ebfMapAddObject(ComponentMap, "datafield", "wch_usu_id");

    ebfMapAddObject(ComponentMap, "name", "MakerHidden8829dd6eecc59cd3276117cf77a1a911");

    ebfMapAddObject(FormMap, "name", "TabelaUsuario");
    FormMap = ebfMapCreateObject();

    EventList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "events", EventList);

    ebfMapAddObject(FormList, "{2C452441-3E53-4239-A8C1-7FC93BF58E4F}", FormMap);

    ebfMapAddObject(FormMap, "FNT_CAMPOCHAVE", "wch_men_id");

    ebfMapAddObject(FormMap, "FNT_SQLSELECT", "Select\n  wch_mensagem.wch_men_id,\n  wch_mensagem.wch_men_mensagem,\n  wch_mensagem.wch_men_data_hora,\n  wch_mensagem.wch_con_id,\n  wch_mensagem.wch_men_usuario,\n  wch_mensagem.wch_men_id_aux\nFrom\n  wch_mensagem\n/*WHERE_NEW*/\n/*ORDER_NEW*/\n");

    ebfMapAddObject(FormMap, "FNT_SQLUPDATE", "\nWCH_MEN_MENSAGEM\n");

    ebfMapAddObject(FormMap, "FNT_TABELA", "WCH_MENSAGEM");

    ebfMapAddObject(FormMap, "GUID", "{2C452441-3E53-4239-A8C1-7FC93BF58E4F}");

    ebfMapAddObject(FormMap, "IMG_ALTERAR", "2");

    ebfMapAddObject(FormMap, "IMG_EXCLUIR", "8");

    ebfMapAddObject(FormMap, "IMG_INCLUIR", "1");

    ComponentList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "components", ComponentList);

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKERMEMO", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "WCH_MEN_MENSAGEM");

    ebfMapAddObject(ComponentMap, "Descricao", "mensagem");

    ebfMapAddObject(ComponentMap, "Type", "M");

    ebfMapAddObject(ComponentMap, "datafield", "WCH_MEN_MENSAGEM");

    ebfMapAddObject(ComponentMap, "description", "mensagem");

    ebfMapAddObject(ComponentMap, "name", "TMAKERMEMO");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "MakerHiddene06a87e1ac876c4ecdc8ac5ff9cd8e3a", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "wch_men_id");

    ebfMapAddObject(ComponentMap, "Type", "Z");

    ebfMapAddObject(ComponentMap, "datafield", "wch_men_id");

    ebfMapAddObject(ComponentMap, "name", "MakerHiddene06a87e1ac876c4ecdc8ac5ff9cd8e3a");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKEREDIT", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "WCH_MEN_DATA_HORA");

    ebfMapAddObject(ComponentMap, "Descricao", "Data/hora");

    ebfMapAddObject(ComponentMap, "Type", "E");

    ebfMapAddObject(ComponentMap, "datafield", "WCH_MEN_DATA_HORA");

    ebfMapAddObject(ComponentMap, "description", "Data/hora");

    ebfMapAddObject(ComponentMap, "name", "TMAKEREDIT");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "EDTWCH_CON_ID", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "WCH_CON_ID");

    ebfMapAddObject(ComponentMap, "CampoChave", "wch_con_id");

    ebfMapAddObject(ComponentMap, "CampoLista", "wch_con_descricao");

    ebfMapAddObject(ComponentMap, "CodigoForm", "{716CAED5-0B61-448D-95E9-7FC93BF58E4F}");

    ebfMapAddObject(ComponentMap, "Descricao", "contexto");

    ebfMapAddObject(ComponentMap, "SQL", "Select\n  wch_contexto.wch_con_id,\n  wch_contexto.wch_con_descricao\nFrom\n  wch_contexto\n/*WHERE_NEW*/\nOrder By\n  wch_contexto.wch_con_descricao\n/*ORDER_ADD*/\n");

    ebfMapAddObject(ComponentMap, "Type", "K");

    ebfMapAddObject(ComponentMap, "datafield", "WCH_CON_ID");

    ebfMapAddObject(ComponentMap, "description", "contexto");

    ebfMapAddObject(ComponentMap, "name", "EDTWCH_CON_ID");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKEREDIT1", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "WCH_MEN_USUARIO");

    ebfMapAddObject(ComponentMap, "Descricao", "usuario");

    ebfMapAddObject(ComponentMap, "Type", "E");

    ebfMapAddObject(ComponentMap, "datafield", "WCH_MEN_USUARIO");

    ebfMapAddObject(ComponentMap, "description", "usuario");

    ebfMapAddObject(ComponentMap, "name", "TMAKEREDIT1");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKEREDIT2", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "WCH_MEN_ID_AUX");

    ebfMapAddObject(ComponentMap, "Descricao", "Id_aux");

    ebfMapAddObject(ComponentMap, "Type", "E");

    ebfMapAddObject(ComponentMap, "datafield", "WCH_MEN_ID_AUX");

    ebfMapAddObject(ComponentMap, "description", "Id_aux");

    ebfMapAddObject(ComponentMap, "name", "TMAKEREDIT2");

    ebfMapAddObject(FormMap, "name", "TabelaMensagem");
    FormMap = ebfMapCreateObject();

    EventList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "events", EventList);

    ebfMapAddObject(FormList, "{907D953E-6493-4FAF-A25A-7FC93BF58E4F}", FormMap);

    ebfMapAddObject(FormMap, "GUID", "{907D953E-6493-4FAF-A25A-7FC93BF58E4F}");

    ebfMapAddObject(FormMap, "IMG_ALTERAR", "2");

    ebfMapAddObject(FormMap, "IMG_EXCLUIR", "8");

    ebfMapAddObject(FormMap, "IMG_INCLUIR", "1");

    ComponentList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "components", ComponentList);

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKERBUTTON", ComponentMap);

    ebfMapAddObject(ComponentMap, "Descricao", "hheh");

    ebfMapAddObject(ComponentMap, "Type", "B");

    ebfMapAddObject(ComponentMap, "description", "hheh");

    ebfMapAddObject(ComponentMap, "name", "TMAKERBUTTON");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKERMEMO", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "M");

    ebfMapAddObject(ComponentMap, "name", "TMAKERMEMO");

    ebfMapAddObject(FormMap, "name", "Tata");
    FormMap = ebfMapCreateObject();

    EventList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "events", EventList);

    ebfMapAddObject(FormList, "{7E6D1142-FB7E-44B0-92C5-7FC93BF58E4F}", FormMap);

    ebfMapAddObject(FormMap, "GUID", "{7E6D1142-FB7E-44B0-92C5-7FC93BF58E4F}");

    ebfMapAddObject(FormMap, "IMG_ALTERAR", "2");

    ebfMapAddObject(FormMap, "IMG_EXCLUIR", "8");

    ebfMapAddObject(FormMap, "IMG_INCLUIR", "1");

    ComponentList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "components", ComponentList);

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "Integracao", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "W");

    ebfMapAddObject(ComponentMap, "name", "Integracao");

    ebfMapAddObject(FormMap, "name", "SofiaNew");
    FormMap = ebfMapCreateObject();

    EventList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "events", EventList);

    ebfMapAddObject(FormList, "{C82DE1CD-0EAE-4AA9-9B65-7FC93BF58E4F}", FormMap);

    ebfMapAddObject(FormMap, "GUID", "{C82DE1CD-0EAE-4AA9-9B65-7FC93BF58E4F}");

    ebfMapAddObject(FormMap, "IMG_ALTERAR", "1");

    ebfMapAddObject(FormMap, "IMG_EXCLUIR", "1");

    ebfMapAddObject(FormMap, "IMG_INCLUIR", "1");

    ComponentList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "components", ComponentList);

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "Integracao", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "W");

    ebfMapAddObject(ComponentMap, "name", "Integracao");

    ebfMapAddObject(FormMap, "name", "NovaSofia");
    FormMap = ebfMapCreateObject();

    EventList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "events", EventList);

    ebfMapAddObject(FormList, "{716CAED5-0B61-448D-95E9-7FC93BF58E4F}", FormMap);

    ebfMapAddObject(FormMap, "FNT_CAMPOCHAVE", "wch_con_id");

    ebfMapAddObject(FormMap, "FNT_CAMPOPESQUISA", "wch_con_descricao");

    ebfMapAddObject(FormMap, "FNT_SQLSELECT", "Select\n  wch_contexto.wch_con_id,\n  wch_contexto.wch_con_descricao,\n  wch_contexto.wch_con_padrao,\n  wch_contexto.wch_con_url,\n  wch_contexto.wch_con_workspace,\n  wch_contexto.wch__ta_icone,\n  wch_contexto.wch_ta_resumo,\n  wch_contexto.wch_app_mode\nFrom\n  wch_contexto\n\n\n/*WHERE_NEW*/\n/*ORDER_NEW*/\n");

    ebfMapAddObject(FormMap, "FNT_SQLUPDATE", "\nWCH_CON_DESCRICAO\n");

    ebfMapAddObject(FormMap, "FNT_TABELA", "WCH_CONTEXTO");

    ebfMapAddObject(FormMap, "GUID", "{716CAED5-0B61-448D-95E9-7FC93BF58E4F}");

    ebfMapAddObject(FormMap, "IMG_ALTERAR", "2");

    ebfMapAddObject(FormMap, "IMG_EXCLUIR", "8");

    ebfMapAddObject(FormMap, "IMG_INCLUIR", "1");

    ComponentList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "components", ComponentList);

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKEREDIT", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "WCH_CON_DESCRICAO");

    ebfMapAddObject(ComponentMap, "Descricao", "Descrição");

    ebfMapAddObject(ComponentMap, "Type", "E");

    ebfMapAddObject(ComponentMap, "datafield", "WCH_CON_DESCRICAO");

    ebfMapAddObject(ComponentMap, "description", "Descrição");

    ebfMapAddObject(ComponentMap, "name", "TMAKEREDIT");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "MakerHidden67e7472df9bd3168ab7e952341475a9c", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "wch_con_id");

    ebfMapAddObject(ComponentMap, "Type", "Z");

    ebfMapAddObject(ComponentMap, "datafield", "wch_con_id");

    ebfMapAddObject(ComponentMap, "name", "MakerHidden67e7472df9bd3168ab7e952341475a9c");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKEREDIT1", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "WCH_CON_PADRAO");

    ebfMapAddObject(ComponentMap, "Descricao", "Padrão");

    ebfMapAddObject(ComponentMap, "Type", "E");

    ebfMapAddObject(ComponentMap, "datafield", "WCH_CON_PADRAO");

    ebfMapAddObject(ComponentMap, "description", "Padrão");

    ebfMapAddObject(ComponentMap, "name", "TMAKEREDIT1");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKEREDIT2", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "WCH_CON_URL");

    ebfMapAddObject(ComponentMap, "Descricao", "url");

    ebfMapAddObject(ComponentMap, "Type", "E");

    ebfMapAddObject(ComponentMap, "datafield", "WCH_CON_URL");

    ebfMapAddObject(ComponentMap, "description", "url");

    ebfMapAddObject(ComponentMap, "name", "TMAKEREDIT2");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKEREDIT3", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "WCH_CON_WORKSPACE");

    ebfMapAddObject(ComponentMap, "Descricao", "workspace");

    ebfMapAddObject(ComponentMap, "Type", "E");

    ebfMapAddObject(ComponentMap, "datafield", "WCH_CON_WORKSPACE");

    ebfMapAddObject(ComponentMap, "description", "workspace");

    ebfMapAddObject(ComponentMap, "name", "TMAKEREDIT3");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "MakerEdit1", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "WCH__TA_ICONE");

    ebfMapAddObject(ComponentMap, "Descricao", "Icone");

    ebfMapAddObject(ComponentMap, "Type", "E");

    ebfMapAddObject(ComponentMap, "datafield", "WCH__TA_ICONE");

    ebfMapAddObject(ComponentMap, "description", "Icone");

    ebfMapAddObject(ComponentMap, "name", "MakerEdit1");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKEREDIT4", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "WCH_TA_RESUMO");

    ebfMapAddObject(ComponentMap, "Descricao", "Resumo");

    ebfMapAddObject(ComponentMap, "Type", "E");

    ebfMapAddObject(ComponentMap, "datafield", "WCH_TA_RESUMO");

    ebfMapAddObject(ComponentMap, "description", "Resumo");

    ebfMapAddObject(ComponentMap, "name", "TMAKEREDIT4");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKEREDIT5", ComponentMap);

    ebfMapAddObject(ComponentMap, "Campo", "wch_app_mode");

    ebfMapAddObject(ComponentMap, "Descricao", "APP MODE");

    ebfMapAddObject(ComponentMap, "Type", "E");

    ebfMapAddObject(ComponentMap, "datafield", "wch_app_mode");

    ebfMapAddObject(ComponentMap, "description", "APP MODE");

    ebfMapAddObject(ComponentMap, "name", "TMAKEREDIT5");

    ebfMapAddObject(FormMap, "name", "TabelaContexto");
    FormMap = ebfMapCreateObject();

    EventList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "events", EventList);

    ebfMapAddObject(FormList, "{B1ED6E6C-D979-400B-93A4-7FC93BF58E4F}", FormMap);

    ebfMapAddObject(FormMap, "GUID", "{B1ED6E6C-D979-400B-93A4-7FC93BF58E4F}");

    ebfMapAddObject(FormMap, "IMG_ALTERAR", "2");

    ebfMapAddObject(FormMap, "IMG_EXCLUIR", "8");

    ebfMapAddObject(FormMap, "IMG_INCLUIR", "1");

    ComponentList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "components", ComponentList);

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "fundopopup1", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "V");

    ebfMapAddObject(ComponentMap, "name", "fundopopup1");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "fundopopup", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "V");

    ebfMapAddObject(ComponentMap, "name", "fundopopup");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "fundopopup2", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "V");

    ebfMapAddObject(ComponentMap, "name", "fundopopup2");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "conversa", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "V");

    ebfMapAddObject(ComponentMap, "name", "conversa");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "molduramenu", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "V");

    ebfMapAddObject(ComponentMap, "name", "molduramenu");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "base", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "V");

    ebfMapAddObject(ComponentMap, "name", "base");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "topo", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "V");

    ebfMapAddObject(ComponentMap, "name", "topo");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "mensagem", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "E");

    ebfMapAddObject(ComponentMap, "name", "mensagem");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKERLABEL", ComponentMap);

    ebfMapAddObject(ComponentMap, "Descricao", "Sofia");

    ebfMapAddObject(ComponentMap, "Type", "L");

    ebfMapAddObject(ComponentMap, "description", "Sofia");

    ebfMapAddObject(ComponentMap, "name", "TMAKERLABEL");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "enviar", ComponentMap);

    ebfMapAddObject(ComponentMap, "Descricao", "Enviar");

    ebfMapAddObject(ComponentMap, "Type", "I");

    ebfMapAddObject(ComponentMap, "description", "Enviar");

    ebfMapAddObject(ComponentMap, "name", "enviar");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKERIMAGE1", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "I");

    ebfMapAddObject(ComponentMap, "name", "TMAKERIMAGE1");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "aguarde", ComponentMap);

    ebfMapAddObject(ComponentMap, "Descricao", "<div class=\"sk-circle\"> <div class=\"sk-circle1 sk-child\"></div><div class=\"sk-circle2 sk-child\"></div><div class=\"sk-circle3 sk-child\"></div><div class=\"sk-circle4 sk-child\"></div><div class=\"sk-circle5 sk-child\"></div><div class=\"sk-circle6 sk-child\"></div><div class=\"sk-circle7 sk-child\"></div><div class=\"sk-circle8 sk-child\"></div><div class=\"sk-circle9 sk-child\"></div><div class=\"sk-circle10 sk-child\"></div><div class=\"sk-circle11 sk-child\"></div><div class=\"sk-circle12 sk-child\"></div></div>");

    ebfMapAddObject(ComponentMap, "Type", "L");

    ebfMapAddObject(ComponentMap, "description", "<div class=\"sk-circle\"> <div class=\"sk-circle1 sk-child\"></div><div class=\"sk-circle2 sk-child\"></div><div class=\"sk-circle3 sk-child\"></div><div class=\"sk-circle4 sk-child\"></div><div class=\"sk-circle5 sk-child\"></div><div class=\"sk-circle6 sk-child\"></div><div class=\"sk-circle7 sk-child\"></div><div class=\"sk-circle8 sk-child\"></div><div class=\"sk-circle9 sk-child\"></div><div class=\"sk-circle10 sk-child\"></div><div class=\"sk-circle11 sk-child\"></div><div class=\"sk-circle12 sk-child\"></div></div>");

    ebfMapAddObject(ComponentMap, "name", "aguarde");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "MakerImage13", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "I");

    ebfMapAddObject(ComponentMap, "name", "MakerImage13");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "MakerImage2", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "I");

    ebfMapAddObject(ComponentMap, "name", "MakerImage2");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "lista", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "C");

    ebfMapAddObject(ComponentMap, "name", "lista");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "descricao", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "L");

    ebfMapAddObject(ComponentMap, "name", "descricao");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "contexto", ComponentMap);

    ebfMapAddObject(ComponentMap, "Descricao", "Texto Fixo");

    ebfMapAddObject(ComponentMap, "Type", "L");

    ebfMapAddObject(ComponentMap, "description", "Texto Fixo");

    ebfMapAddObject(ComponentMap, "name", "contexto");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "optionIcon", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "I");

    ebfMapAddObject(ComponentMap, "name", "optionIcon");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "audio", ComponentMap);

    ebfMapAddObject(ComponentMap, "Descricao", "Audio");

    ebfMapAddObject(ComponentMap, "Type", "I");

    ebfMapAddObject(ComponentMap, "description", "Audio");

    ebfMapAddObject(ComponentMap, "name", "audio");

    ebfMapAddObject(FormMap, "name", "Sofia");
    FormMap = ebfMapCreateObject();

    EventList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "events", EventList);

    ebfMapAddObject(FormList, "{5F38EE2D-42A3-4525-A456-7FC93BF58E4F}", FormMap);

    ebfMapAddObject(FormMap, "GUID", "{5F38EE2D-42A3-4525-A456-7FC93BF58E4F}");

    ebfMapAddObject(FormMap, "IMG_ALTERAR", "2");

    ebfMapAddObject(FormMap, "IMG_EXCLUIR", "8");

    ebfMapAddObject(FormMap, "IMG_INCLUIR", "1");

    ComponentList = ebfMapCreateObject();

    ebfMapAddObject(FormMap, "components", ComponentList);

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "Integracao", ComponentMap);

    ebfMapAddObject(ComponentMap, "Type", "W");

    ebfMapAddObject(ComponentMap, "name", "Integracao");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKERBUTTON", ComponentMap);

    ebfMapAddObject(ComponentMap, "Descricao", "Criar mapa");

    ebfMapAddObject(ComponentMap, "Type", "B");

    ebfMapAddObject(ComponentMap, "description", "Criar mapa");

    ebfMapAddObject(ComponentMap, "name", "TMAKERBUTTON");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKERBUTTON1", ComponentMap);

    ebfMapAddObject(ComponentMap, "Descricao", "importar gmaps");

    ebfMapAddObject(ComponentMap, "Type", "B");

    ebfMapAddObject(ComponentMap, "description", "importar gmaps");

    ebfMapAddObject(ComponentMap, "name", "TMAKERBUTTON1");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKERBUTTON2", ComponentMap);

    ebfMapAddObject(ComponentMap, "Descricao", "Iniciar");

    ebfMapAddObject(ComponentMap, "Type", "B");

    ebfMapAddObject(ComponentMap, "description", "Iniciar");

    ebfMapAddObject(ComponentMap, "name", "TMAKERBUTTON2");

    ComponentMap = ebfMapCreateObject();

    ebfMapAddObject(ComponentList, "TMAKERBUTTON3", ComponentMap);

    ebfMapAddObject(ComponentMap, "Descricao", "parar");

    ebfMapAddObject(ComponentMap, "Type", "B");

    ebfMapAddObject(ComponentMap, "description", "parar");

    ebfMapAddObject(ComponentMap, "name", "TMAKERBUTTON3");

    ebfMapAddObject(FormMap, "name", "Gps");

    //  Fim
    
    return (Map);
    
}

