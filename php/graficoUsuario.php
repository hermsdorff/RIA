<?php
require_once 'conexao.php';
$arrDados 	= $_REQUEST;
$arrMessage = array();

if($arrDados["acao"]=="grafico")
{
        $strSQL  = "SELECT 	  COUNT( u.id ) AS total
								,u.nome as Nome
						   FROM
								usuario as u
							GROUP BY
                                u.nome								
					   ";

		$objRs = mysql_query($strSQL);
		$arrBanco = array();

		while($objRow = mysql_fetch_assoc ($objRs))
		{
			$arrBanco[] = $objRow;
		}

        echo json_encode(array(
            "data" => $arrBanco,
            "success" => true
        ));


}
mysql_close();
