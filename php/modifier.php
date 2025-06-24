<?php
//recupérer les infos de la bases se données
$Id = $_GET['id'];

if(isset($_POST['send'])){
    if(isset($_POST['nom']) && isset($_POST['secteur_activite']) && isset($_POST['email_contact']) && isset($_POST['telephone']) && isset($_POST['participation'])){
        if(!empty ($_POST['nom']) && !empty($_POST['secteur_activite']) && !empty($_POST['email_contact']) && !empty($_POST['telephone']) && !empty($_POST['participation'])){
        include_once "connexion.php";

//echappement des data pour la sécuritées (lasa root fotsiny voa tsisy an'io)
$nom = mysqli_real_escape_string($conn, $_POST['nom']);
$secteur_activite = mysqli_real_escape_string($conn, $_POST['secteur_activite']);
$email_contact = mysqli_real_escape_string($conn, $_POST['email_contact']);
$telephone = mysqli_real_escape_string($conn, $_POST['telephone']);
$participation = mysqli_real_escape_string($conn, $_POST['participation']);

    $sql = "UPDATE entreprises SET nom = '$nom', secteur_activite = '$secteur_activite', email_contact = '$email_contact', telephone = '$telephone', participation = '$participation' WHERE Id = $Id";
    if (mysqli_query($conn, $sql)){
        header("location:liste.php");
    }else{
        echo "<p>modify failed</p>";
}}}}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modification</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Modifiez une entreprise</h1>
    </header>
    <main>
            <?php
    include_once "connexion.php";
    $sql = "SELECT * FROM entreprises WHERE Id = $Id";
    $result = mysqli_query($conn, $sql);
    while($_row = mysqli_fetch_assoc($result)){
    ?>
    <form action="" method="post" class="tableau">
        <input class="case" type="text" name="nom" placeholder="nom de l'entreprise" value="<?=$_row['nom']?>"><br>
        <input class="case" type="text" name="secteur_activite" placeholder="secteur d'activité" value="<?=$_row['secteur_activite']?>"><br>
        <input class="case" type="email" name="email_contact" placeholder="Email" value="<?=$_row['email_contact']?>"><br>
        <input class="case" type="text" name="telephone" placeholder="numero" value="<?=$_row['telephone']?>"><br>
        <input class="case" type="text" name="participation" placeholder="type de participation" value="<?=$_row['participation']?>"><br>
        <input type="submit" name="send" value="modifier" class="add"><br>
        <a href="liste.php" class="cancel">Annuler</a>
    </form>
        <?php
    }
    ?>
    </main>
</body>
</html>