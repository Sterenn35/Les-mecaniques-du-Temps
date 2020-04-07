

let i = 0; // On met les variables qui vont augmenter au fur et à mesure ici
let j = 0; // Elle est nouvelle et on va l'utiliser pour changer les histoires

let bouton1 = document.getElementById("1"); // Bon là on récupère le bouton 1
let bouton2 = document.getElementById("2"); // ...
let bouton3 = document.getElementById("3"); // ...
let storyBox = document.getElementById("histoire"); // on récupère le paragraphe histoire (c'est nouveau)
// '.' = Histoire, image cliquable // '/' = ya rien, mis au début // '>' = apparition d'un bouton suite
let choix1 = ['/', '.', 'Wesh là ct pas sympa comment il se moquait le minion', '>', "Moi j'aime pas le bambou", '.', '>']; // Tu coco le principe maintenant 
let choix2 = ['/', '.', 'Oh le petit enfoiré je vais lui faire manger ses grands morts', '>', 'Je préfère le pangolin au petit déj\'', '.', '>']; // J'ai fait un récapitulatif des codes au dessus quand même
let choix3 = ['/', '.', "Pas de violence ... c'est le confinement", '>', 'Eh mais je vais lui faire bouffer son bambou',  '.', '>'];

let stories = ['/', 'Histoire 1', 'Histoire2'] // Attention c'est pas le même fonctionnement : en gros, ça correspond à l'ensemble des histoires (pas au niveau)
// Ces histoires ne sont pas forcément successives : par exemple on peut mettre une histoire au niveau 1 et une au niveau 6 en gardant l'écriture :
// let stories = ['/', 'Niveau 1', 'Niveau 6']
let trueresp = ['0', '0', '2', '0', '1', '0', '0'] // '0' = caractère spécial // '1'/'2'/'3' correspond aux Ids des boutons avec la bonne réponse pour chaque niveau

$(document).on('click', '.start', function() { // Quand on clique sur le bouton Start
	i += 1; // Allez c'est parti on passe au premier niveau
	if (choix1[i] === '.') { // Rercherche de la nature du niveau suivant
		j += 1;
		// ICI soit tu mets : "j+=1" qui va changer ton histoire et dc dans le HTML tu laisses <p></p> vide (tu devras alors faire : let stories = ['/', 'histoire1', 'histoire2'])
		// soit tu mets rien et tu remplis <p>histoire1</p> et tu fais : let stories = ['/', 'histoire2', 'histoire3']
		$('.story').addClass('visible'); // Apparition de l'histoire
		storyBox.innerHTML = stories[j]; // Affichage
	} else if (choix1[i] === '>') { // C'est une Suite
		$('.next').addClass('visible'); // Apparition bouton Suite
	} else { // C'est un QCM
		$('.boxRep').addClass('visible');
		bouton1.innerHTML = choix1[i]; // Affichage des nouveaux boutons
		bouton2.innerHTML = choix2[i];
		bouton3.innerHTML = choix3[i];
	}
	$(this).removeClass('visible') // Le bouton Commencer dégage dans tous les cas
	$('.background').attr('src', 'Javascript/images/background' + String(i) + '.jpg');
	return;
});

$(document).on('click', '.select', function() { // Quand on clique sur le bouton réponse
	if ($(this).attr("id") === trueresp[i]) { // Vérification de la véracité de la réponse
		i += 1; // Si oui : passage au niveau suivant
		if (choix1[i] === '.') { // Rercherche de la nature du niveau suivant
			j += 1;	// Histoire : changement d'histoire
			$('.boxRep').removeClass('visible'); // Disparirion QCM
			$('.story').addClass('visible'); // Apparition de l'histoire
			storyBox.innerHTML = stories[j]; // Affichage
		} else if (choix1[i] === '>') { // C'est une Suite
			$('.next').addClass('visible'); // Apparition bouton suite
			$('.boxRep').removeClass('visible'); // Disparition du QCM
		} else { // C'est un QCM
			bouton1.innerHTML = choix1[i]; // Affichage des nouveaux boutons
			bouton2.innerHTML = choix2[i];
			bouton3.innerHTML = choix3[i];
		}
		alert('C\'est gagné ! C\'est gagné !'); // On le met bien avec Dora
	} else { // Eh non finalement le joueur est vraiment nul à chier il perd encore ...
		i = 0; // Remise à 0 pour la 100ème fois ...
		j = 0; // Ne pas oublier on remet aussi les histoires à 0
		$('.boxRep').removeClass('visible'); // Disparition QCM
		$('.start').addClass('visible'); // Apparition du bouton Commencer
		alert('OOOOOH non tu as perdu espèce de sombre merde'); // Et un petit message sympatique
	}
	$('.background').attr('src', 'Javascript/images/background' + String(i) + '.jpg'); // Changement de plan (remise à 0)
	return;
});

$(document).on('click', '.next', function() { // Quand on clique sur le bouton Suite
	i += 1; // Passage au niveau suivant
	if (choix1[i] === '.') { // Rercherche de la nature du niveau suivant
		j += 1;	// Histoire : changement d'histoire
		$(this).removeClass('visible'); //Disparirion du bouton Suite
		$('.story').addClass('visible'); // Apparition de l'histoire
		storyBox.innerHTML = stories[j]; // Affichage
	} else if (choix1[i] === '>') { // Suite encore ...
		// On a rien à faire (je laisse un vide du coup)
	} else { // C'est un QCM
		$('.boxRep').addClass('visible'); // Apparition QCM
		$(this).removeClass('visible'); // Disparition bouton Suite
		bouton1.innerHTML = choix1[i]; // Affichage
		bouton2.innerHTML = choix2[i];
		bouton3.innerHTML = choix3[i];
	}
	$('.background').attr('src', 'Javascript/images/background' + String(i) + '.jpg');
	return;
});

$(document).on('click', '.background', function() { // Dès que tu cliques sur un background
	if (choix1[i] === '.') { // Vérification si le niveau actuel autorise le passage de niveau en cliquant sur l'image
		i += 1; // Si c'est le cas augmentation d'un niveau
		if (choix1[i] === '.') { // Rercherche de la nature du niveau suivant
			j += 1;	// Histoire : changement d'histoire
			storyBox.innerHTML = stories[j]; // Affichage
		} else if (choix1[i] === '>') { // Suite
			$('.next').addClass('visible'); // Apparition bouton suite
			$('.story').removeClass('visible'); // Disparition du QCM
		} else { // QCM
			$('.boxRep').addClass('visible'); // Apparition QCM
			$('.story').removeClass('visible'); // Disparition histoire
			bouton1.innerHTML = choix1[i]; // Affichage
			bouton2.innerHTML = choix2[i];
			bouton3.innerHTML = choix3[i];
		}
		$('.background').attr('src', 'Javascript/images/background' + String(i) + '.jpg'); // Changement de plan
		return;
	};
});

$(document).on('click', '.help', function() {
    if ($(this).closest('.boxGame').find('.tutorial').attr("class") === "tutorial visible") {
        $('.tutorial').removeClass('visible');
    } else {
        $('.tutorial').addClass('visible');
    };
});