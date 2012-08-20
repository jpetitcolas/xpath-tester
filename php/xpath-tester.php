<?php

    // Trim is important here to avoid some empty lines at the beginning of the copy/paste.
    $xpathExpression = trim($_POST['xpath_expression']);
    $xmlInput = trim($_POST['xml_input']);

    // Also remove all break lines and tabs to allow a correct output indentation.
    $xmlInput = strtr($xmlInput, array("\t" => '', "\n" => '', "\r" => ''));

    // And turn xmlns root attribute to ns to be able to parse document
    $xmlInput = str_replace('xmlns=', 'ns=', $xmlInput);

    // Execute XPath query
    $domDocument = new DOMDocument();
    $domDocument->loadXml($xmlInput);

    $domDocument->formatOutput = true;
    $domDocument->preserveWhiteSpace = true;

    $xpath = new DOMXPath($domDocument);
    $results = $xpath->query($xpathExpression);

    // Highlight matching elements by adding a correct span
    $output = htmlentities($domDocument->saveXML(), ENT_QUOTES, 'utf-8');
    
    $numberResults = $results->length;
    for($i = 0 ; $i < $numberResults ; $i++) {
        
        // Retrieve match XML
        $result = $results->item($i);
        $result = htmlentities($result->ownerDocument->saveXML($result), ENT_QUOTES, 'utf-8');
        
        // Highlight it
        $output = str_replace($result, '<span class="highlight">'.$result.'</span>', $output);
    }

    echo $output;
