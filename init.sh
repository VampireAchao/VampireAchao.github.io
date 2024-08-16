current_date=`date +%Y-%m-%d`
backup_dir=../backup/
if [ ! -d "$backup_dir" ];then
    mkdir "$backup_dir"
fi
echo "备份到$backup_dir$current_date"
cp -r ./source/_posts $backup_dir$current_date
rm -rf * .deploy_git ./node_modules/ ./.idea/ ./.git/ ./.gitignore ./public/ ./db.json
git config --global user.name "VampireAchao"
git config --global user.email "achao1441470436@gmail.com"
git init
git remote add -f origin https://gitee.com/VampireAchao/blog-backup.git
git pull origin main
git branch --set-upstream-to=origin/main main
npm i