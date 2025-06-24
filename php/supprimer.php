<?php
$Id = $_GET['id']; //recupère  l'identifiant ($_row) de l'user a supprimer via la methode get dans le lien supprime de 'show_user.php' '

include_once "connexion.php"; //se connecter a la base

$sql = "DELETE FROM entreprises where Id = $Id"; //tjrs verifier si la rerquête a étét éxecuter avec mysqli_query
if(mysqli_query($conn, $sql)){
    header("location:liste.php?message:DeleteSuccess");
}else{
    echo "<p>delete failed</p>";    
}
?>