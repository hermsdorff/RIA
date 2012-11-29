<?php

$menu = "{
            children: [
                    {
                        text:'Clientes Cadastros',
                        expanded: true,
                        children:[
                            {
                                text:'Usuários cadastrados',
                                leaf: true,
                                itemMenu: 'usuarioList'
                            },
                            {
                                text:'Contas cadastradas',
                                leaf: true,
                                itemMenu: 'contaList'
                            },
                            {
                                text:'Fluxos Cadastrados',
                                leaf: true,
                                itemMenu: 'fluxoList'
                            },
                        ]
                    }
                    ,
                    {
                        text:'Relatórios',
                        expanded: true,
                        children:[
                            {
                                text:'Gráfico Fluxo de Caixa',
                                leaf:true,
                                itemMenu: 'graficoConta'
                            }
                        ]
                    }
					
                ]
            }";
echo $menu;
