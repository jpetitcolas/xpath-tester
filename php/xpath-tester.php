<?php

    // Trim is important here to avoid some empty lines at the beginning of the copy/paste.
    $xpathExpression = trim($_POST['xpath_expression']);
    $xmlInput = trim($_POST['xml_input']);

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
        $output[] = $result->ownerDocument->saveXML($result);
    }

    echo json_encode($output);
