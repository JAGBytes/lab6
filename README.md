# LABORATORIO 6 – React

Se actualizó el plan del proyecto en AzureDevOps.
![image](https://github.com/user-attachments/assets/ee6c895a-ddd7-4855-8cb9-f942ddb6aa3c)

Se realizó los ajustes necesarios en las bases de datos y se implementó los servicios requeridos.

*1. Autenticación:* El gestor de tareas tiene un sistema de autenticación donde los usuarios podrán gestionar sus tareas; una vez que el usuario inicia sesión podrá ver sus tareas.

  a)	Se realizó el método authentication en Userservice.

  ```java
      public String authentication(String email, String passwd) throws Exception {
      try{
          User user = userRepository.findByEmail(email);
          if (user != null && user.getPasswd().equals(passwd) && user.getEmail().equals(email)){
              return user.getId();
          }
          else{
              throw new Exception("User doesn't exist or invalid credentials");
          }
      } catch (Exception e) {
          throw new Exception(e.getMessage());
      }
    }
  ```

  b)	Se hizo un nuevo controlador llamado LoginController, para el primer método para registro de un usuario. 

  ```java
      @CrossOrigin(origins = "*")
      @PostMapping("/register")
      public ResponseEntity<String> register(@RequestBody User user) {
          try {
              userService.createUser(user);
              return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
          } catch (Exception e) {
              return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
          }
      }
  ```

  Y el segundo método para login cuando ya existe un usuario.

  ```java
      @CrossOrigin(origins = "*")
      @PostMapping("/login")
      public ResponseEntity<String> login(@RequestBody Map<String, String> loginData) {
          try {
              String email = loginData.get("email");
              String passwd = loginData.get("passwd");
              String id = userService.authentication(email, passwd) ;
              if(id!=null){
                  return new ResponseEntity<>(id, HttpStatus.OK);
              } else {
                  return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
              }
          } catch (Exception e) {
              return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
          }
      }
  ```

Para guardar los usuarios en una nueva tabla de datos, se hizo un nuevo repositorio.

  ```java
      @Repository
      public interface UserMySqlRepository extends JpaRepository<User, String>{
      
          default void createUser(User user){
              save(user);
          }
          default void deleteUser(User user){
              delete(user);
          }
          default User getUser(String idUser){
              return findById(idUser).orElse(null);
          }
          default void modifyUser(User user){
              save(user);
          }
          User findByUsername(String userName);
          User findByEmail(String email);
          default String getUserName(String idUser){
              User user = getUser(idUser);
              if(user != null){
                  return user.getUsername();
              }
              return null;
          }
  ```

Y en cada una de las clases de usuario se hizo la relación de las 2 tablas de usuarios y tareas.

  ```java
      @ManyToOne
      @JoinColumn(name = "user_id")
      private User user;
  ```

  ```java
      @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
      private List<Task> tasks;
  ```

![image](https://github.com/user-attachments/assets/c5c6f3a8-4bd4-4406-a805-2836beea5137)

Tabla de usuarios
![image](https://github.com/user-attachments/assets/9ff1c64b-0d5f-4861-bea0-8f9433eb7934)

Tabla de tareas
![image](https://github.com/user-attachments/assets/b6aac34d-c2f1-419d-9abd-97be1be8ef2e)

2.	Todas las interfaces gráficas se migraron a REACT.
   
Para la ruta de las páginas que se crearon anteriormente registro, login, formulario de tareas y insights.

 ![image](https://github.com/user-attachments/assets/8e0a6d35-daa8-4bd3-b740-b82a95d895ea)

Se mostraron cada uno de los componentes sus importaciones y cada una de su interfaz. 

Login 

![image](https://github.com/user-attachments/assets/0f8e2ab5-ca2b-4c82-886d-a6e2ca6d2c20)
![image](https://github.com/user-attachments/assets/27dd996d-bf84-45e7-998a-d6516c989ac5)

Register

![image](https://github.com/user-attachments/assets/0b79f6ce-38c6-4e22-8a64-00f20417f8bd)
![image](https://github.com/user-attachments/assets/307577d5-7d50-4c4f-861e-082d781c58d2)

Tareas

![image](https://github.com/user-attachments/assets/31211d62-0d43-4db3-ae22-29bd36de9f46)
![image](https://github.com/user-attachments/assets/8881fa3f-be46-4228-8fab-f3801daa469b)
 
Usuario

![image](https://github.com/user-attachments/assets/50ff8998-b70c-4e36-add9-6b0be4e26a1b)
![image](https://github.com/user-attachments/assets/2b2252fb-56b2-41f2-988c-ea838c021c06)

Insights

  *Diagrama de dificultad*
  
  ![image](https://github.com/user-attachments/assets/ec453f6a-64f0-4753-a4ed-55caa193eea9)
  ![image](https://github.com/user-attachments/assets/0ed2a62f-75ec-46f3-a190-df6184ea43cc)
  

  *Diagrama Numero de Tareas por Prioridad*

  ![image](https://github.com/user-attachments/assets/64a03f64-8763-4f59-af9e-3ada6df8e954)
  ![image](https://github.com/user-attachments/assets/602db1f8-fb22-48d8-ad53-5eb25f405634)

  *Diagrama de Tareas completadas por tiempo*

  ![image](https://github.com/user-attachments/assets/7ab8501e-b194-4f65-b73d-951a3b1b052b)
  ![image](https://github.com/user-attachments/assets/8439ae8b-74bb-4244-94f2-2c8b4c1e58b3)

  *Diagrama Tiempo total*
  
  ![image](https://github.com/user-attachments/assets/6bcba948-ef31-4bc3-abd4-ddf8749be4aa)
  ![image](https://github.com/user-attachments/assets/12acb3e1-5589-473f-b093-a9d58e50bdf0)


3.	Todas las nuevas funcionalidades con cobertura de pruebas.

   La prueba comprueba que al ejecutar el método RandomTask(userId) con parámetro userId, verifica que el método genera una o más tareas aleatorias y las guarda para un usuario específico.

   ```java
      @Test
      void testRandomTask() throws Exception {
          UserService spyTaskService = spy(taskService);
          doNothing().when(spyTaskService).saveTaskByUser(anyString(), any(Task.class));
          spyTaskService.RandomTask(userId);
          verify(spyTaskService, atLeastOnce()).saveTaskByUser(eq(userId), any(Task.class));
      }
   ```

  La prueba comprueba que al ejecutar el método RandomTask(userId) con parámetro userId, verifica que el número total de invocaciones esté dentro de un rango esperado (entre 100 y 1000 veces). 

  ```java
       @Test
        void testRandomTask2() throws Exception {
            UserService spyTaskService = spy(taskService);
            doNothing().when(spyTaskService).saveTaskByUser(anyString(), any(Task.class));
            spyTaskService.RandomTask(userId);
            verify(spyTaskService, atLeastOnce()).saveTaskByUser(eq(userId), any(Task.class));
            int numberOfInvocations = mockingDetails(spyTaskService).getInvocations().stream()
                    .filter(invocation -> invocation.getMethod().getName().equals("saveTaskByUser"))
                    .toArray().length;
            assertTrue(numberOfInvocations >= 100 && numberOfInvocations <= 1000);
        }
  ```

La prueba testCreateUserSuccessful() tiene como objetivo verificar que el método createUser() funcione correctamente cuando se intenta crear un usuario nuevo y el correo electrónico no está registrado previamente en la base de datos. 

```java
    @Test
    public void testCreateUserSuccessful() throws Exception {
        when(userMySqlRepository.findByEmail(user.getEmail())).thenReturn(null);
        taskService.createUser(user);
        verify(userMySqlRepository).createUser(user);
    }
```

La prueba testAuthenticationSuccessful() verifica que el método funcione correctamente cuando se proporciona un correo electrónico y contraseña válidos.

```java
    @Test
    public void testAuthenticationSuccessful() throws Exception {
        when(userMySqlRepository.findByEmail(user.getEmail())).thenReturn(user);
        String authUser = taskService.authentication(user.getEmail(),user.getPasswd());
        assertEquals(user.getId(), authUser);
        verify(userMySqlRepository).findByEmail(user.getEmail());
    }
```

La prueba testModifyUserSuccess() verifica se modifique correctamente un usuario existente en el sistema.

```java
@Test
    public void testModifyUserSuccess() throws Exception {
        when(userMySqlRepository.getUser(user.getId())).thenReturn(user);
        boolean result = taskService.modifyUser(user1);
        assertTrue(result);
        verify(userMySqlRepository).modifyUser(user1);
    }
```

La prueba testDeleteUserSuccess() verifica que elimine correctamente un usuario existente en el sistema.

```java
    @Test
    public void testDeleteUserSuccess() throws Exception {
        when(userMySqlRepository.getUser(user.getId())).thenReturn(user);
        boolean result = taskService.deleteUser(user.getId());
        assertTrue(result);
        verify(userMySqlRepository).deleteUser(user);
    }
```

La prueba testGetUsernameSuccess() verifica que recupere el nombre de usuario de un usuario existente.

```java
    @Test
    public void testGetUsernameSuccess() throws Exception {
        when(userMySqlRepository.getUserName(userId)).thenReturn(user.getUsername());
        String username = taskService.getUsername(userId);
        assertEquals(user.getUsername(), username);
        verify(userMySqlRepository).getUserName(userId);
    }
```

La prueba testSaveTaskWithNullUser() verifica que el sistema maneje correctamente el caso cuando se intenta guardar una tarea asociada a un usuario inexistente.

```java
    @Test
    public void testSaveTaskWithNullUser() {
        // Configurar el comportamiento simulado para el repositorio de usuarios
        when(userMySqlRepository.getUser("invalidUserId")).thenReturn(null);

        // Intentar guardar una tarea con un ID de usuario que no existe y verificar la excepción
        Exception exception = assertThrows(Exception.class, () -> {
            taskService.saveTaskByUser("invalidUserId", task1);
        });

        // Verificar que el mensaje de la excepción sea el esperado
        assertEquals("The user doesn't exist", exception.getMessage());
    }
```

La prueba testSaveTaskByUserThrowsException() verifica que el sistema lance una excepción adecuada cuando se intenta guardar una tarea para un usuario no existente.

```java
@Test
    public void testSaveTaskByUserThrowsException() {
        when(userMySqlRepository.getUser("invalidUserId")).thenReturn(null);
        Exception exception = assertThrows(Exception.class, () -> {
            taskService.saveTaskByUser("invalidUserId", task1);
        });
        assertEquals("The user doesn't exist", exception.getMessage());
    }
```
