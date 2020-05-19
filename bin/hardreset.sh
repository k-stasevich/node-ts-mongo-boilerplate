for file in ./src/db/migrations/migrations/*
do
  npm run migrate:down
  echo "$file"
done
npm run migrate
npm run seed
