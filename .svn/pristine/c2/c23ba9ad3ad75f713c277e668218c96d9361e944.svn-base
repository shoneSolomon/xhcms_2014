<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>提交成功</title>
</head>
<body>
<?php
$uploadDir = 'temp/'; //file upload path
$uploadFile = $uploadDir . $_FILES['upload']['name'];
move_uploaded_file($_FILES['upload']['tmp_name'], $uploadFile);
echo( '{"status":true}' )
?>
</body>
</html>