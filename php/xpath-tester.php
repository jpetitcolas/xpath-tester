<?php

    const HIGHLIGHT_TOKEN = 'XPATH-TESTER-HIGHLIGHT';

    // Trim is important here to avoid some empty lines at the beginning of the copy/paste.
    $xpathExpression = trim($_POST['xpath_expression']);
    $xmlInput = trim($_POST['xml_input']);

    // Also remove all break lines and tabs to allow a correct output indentation.
    $xmlInput = strtr($xmlInput, array("\t" => '', "\n" => '', "\r" => ''));

    // And turn xmlns root attribute to ns to be able to parse document
    $xmlInput = preg_replace('#xmlns(:.+)?=#U', ' ns\1=', $xmlInput);

    // Execute XPath query
    $domDocument = new DOMDocument();
    $domDocument->loadXml($xmlInput);

    $xpath = new DOMXPath($domDocument);
    $results = $xpath->query($xpathExpression);

    // Highlight matching elements by adding a correct span
    $output = $domDocument->saveXML();
    
    $numberResults = $results->length;
    for($i = 0 ; $i < $numberResults ; $i++) {
        
        // Retrieve matched XML
        $result = $results->item($i);
        $result = $result->ownerDocument->saveXML($result);
        
        // Highlight it
        $replacingString = sprintf('<!-- %s -->%s<!-- END-%s -->', HIGHLIGHT_TOKEN, $result, HIGHLIGHT_TOKEN);
        $output = str_replace($result, $replacingString, $output);

    }

    // Format the XML result
    $domDocument = new DOMDocument();
    $domDocument->loadXml($output);

    // With some indentation
    $domDocument->formatOutput = true;
    $domDocument->preserveWhiteSpace = true;

    // Convert all angle brackets to a correct display
    $output = htmlentities($domDocument->saveXml(), ENT_QUOTES, 'utf-8');

    // Replace highlighting comments by a highlighting span
    $output = str_replace('&lt;!-- '.HIGHLIGHT_TOKEN.' --&gt;', '<span class="highlight">', $output);
    $output = str_replace('&lt;!-- END-'.HIGHLIGHT_TOKEN.' --&gt;', '</span>', $output);

    // Finally remove breaklines before and after highlighted blocks.
    $output = preg_replace('#'.PHP_EOL.'( *)<span class="highlight">#', '<span class="highlight">', $output);
    $output = preg_replace('#( *)</span>( *)'.PHP_EOL.'#', '</span>', $output);

    echo $output;

