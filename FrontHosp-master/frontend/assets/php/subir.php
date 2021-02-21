<?php
    $nombre_temporal = $_FILES['examenEncuentro']['tmp_name'];
    $nombre = $_FILES['examenEncuentro']['name'];
    move_uploaded_file($nombre_temporal, './pdfs/'.$nombre);
?>