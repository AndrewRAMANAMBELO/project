<?php
include_once "connexion.php"; //se connecter a la base
$sql = "SELECT * FROM entreprises"; // requête pour montrer les infos dans la bases
$result = mysqli_query($conn, $sql); //s'execute tjrs après une requête sql
if (mysqli_num_rows($result)>0){ //condition qui vérifie si le nombre de ligne dans la base est sup a 0
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Liste des entreprises inscrites</title>
</head>
<body>
    <header>
        <h1>Liste des entreprises inscrites</h1>
        <a href="inscription.php" class="header_btn">S'inscrire</a>
    </header>
    <main>
        <table class="liste_tableau">
        <thead>
            <tr class="head">
            <th>Nom</th>
            <th>Secteur</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Participation</th>
            <th>Date</th>
            <th>Modifier</th>
            <th>Supprimer</th>
            </tr>
        </thead>
        <tbody>
<?php
while($_row = mysqli_fetch_assoc($result)){
?>
            
            <tr>
            <td class="info"><?=$_row['nom']?></td>
            <td><?=$_row['secteur_activite']?></td>
            <td><?=$_row['email_contact']?></td>
            <td><?=$_row['telephone']?></td>
            <td><?=$_row['participation']?></td>
            <td><?=$_row['date_inscription']?></td>
            <td><a class="add" href="modifier.php?id=<?php echo $_row['Id']?>">modifier</a></td>
            <td><a class="cancel" href="supprimer.php?id=<?php echo $_row['Id']?>" style="padding-top: 7px; padding-bottom: 7px;">supprimer</a></td>
            </tr>
<?php
}}else{
    echo "<p>0 entreprise</p>";;
}
?>
        </tbody>
    </table>
    </main>
</body>
</html>