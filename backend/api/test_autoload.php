<?php
require_once __DIR__ . '/../vendor/autoload.php';

echo "<pre>";

$map = require __DIR__ . '/../vendor/composer/autoload_psr4.php';

print_r($map);
