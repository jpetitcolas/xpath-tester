<?php

    // Trim is important here to avoid some empty lines at the beginning of the copy/paste.
    $xpathExpression = trim($_POST['xpath_expression']);
    $xmlInput = trim($_POST['xml_input']);

    // Execute XPath query
    $domDocument = new DOMDocument();
    $domDocument->loadXml($xmlInput);

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
        $regex = '#'.preg_quote($result).'#';
        $replacingString = sprintf('<span class="highlight">%s</span>', $result);
        $output = preg_replace($regex, $replacingString, $output);

    }

    echo $output;
