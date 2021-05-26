#¡IMPORTANTE! 
#Usar este cuando quieres guardar estos cambios en la master de la nube y hacer deploy en heroku
#Pararte siempre en la ruta raiz osea que diga "/shippingbox". NO "/shippingbox/cliente" ni "/shippingbox/server"
 
# Para usar : sh deploy.sh o ./deploy.sh

echo "Introduzca el comentario del deploy:"
read comment

cd client
npm run build

cd ..

git add .
git commit -m "$comment - Push to Dev Repository"
git push origin master

cd server

git add .
git commit -m "$comment - Push to Production Repository"
git push heroku master

echo "¡Deploy Finalizado!"