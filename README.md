Dashboard React typescript and Supabase

1. MUI
2. supabase


Refer supabase auth info https://github.com/FaztWeb/react-supabase-auth-crud/blob/master/src/App.jsx

RLS based on role 
```postgresql
((( SELECT users.role
   FROM users
  WHERE (users.id = auth.uid())))::text = 'admin'::text)
```

CRUD on supbase js client
```js
const { data, error } = await supabase
  .from('countries')
  .select()
```

```js
const { data, error } = await supabase
  .from('countries')
  .insert({ id: 1, name: 'Denmark' })
  .select()
```

```js
const { data, error } = await supabase
  .from('countries')
  .upsert({ id: 1, name: 'Albania' })
  .select()
```

```js
const { error } = await supabase
  .from('countries')
  .delete()
  .eq('id', 1)
```

