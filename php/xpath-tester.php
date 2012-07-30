<?php

    // Retrieve the request
    $xpathExpression = $_POST['xpath_expression'];
    $xmlInput = $_POST['xml_input'];

    // Execute XPath query
    $domDocument = new DOMDocument();
    $domDocument->loadXml($xmlInput);

    $xpath = new DOMXPath($domDocument);
    $results = $xpath->query($xpathExpression);

    // Turn results into JSON
    $output = array();

    $numberResults = $results->length;
    for($i = 0 ; $i < $numberResults ; $i++) {
        $result = $results->item($i);
        $output[] = $result->nodeValue;
    }

    echo json_encode($output);
