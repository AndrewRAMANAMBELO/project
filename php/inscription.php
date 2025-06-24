<?php
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

    $sql = "INSERT INTO entreprises (nom, secteur_activite, email_contact, telephone, participation) VALUES ('$nom', '$secteur_activite', '$email_contact', '$telephone', '$participation')";

    if(mysqli_query($conn, $sql)){
        header("location:liste.php");
    }else{
        echo "<p>inscription failed</p>";
    }}
    else{
        header("location:liste.php?message:empty_fiel_!");
    }}}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Ajoutez une entreprise</h1>
        <a href="liste.php" class="header_btn">voir liste</a>
    </header>
    <main>
    <form action="" method="post" class="tableau">
        <input class="case" type="text" name="nom" placeholder="nom de l'entreprise"><br>
        <input class="case" type="text" name="secteur_activite" placeholder="secteur d'activité"><br>
        <input class="case" type="email" name="email_contact" placeholder="Email"><br>
        <input class="case" type="text" name="telephone" placeholder="numero"><br>
        <input class="case" type="text" name="participation" placeholder="type de participation"><br>
        <input type="submit" name="send" value="Ajoutez" class="add"><br>
        <a href="liste.php" class="cancel">Annuler</a>
    </form>
    </main>
</body>
</html>