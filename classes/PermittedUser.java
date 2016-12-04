
// note we might have to do something to protect the passwords

public class PermittedUser 
{
    enum Status
    {
        ONLINE, OFFLINE
    }
   
   private String surname;
   private String givenName;
   private String email;
   private String loginID;
   private String password;
   private Status status;
    
    public PermittedUser()
    {
        // You should not instancise this class, only its subclasses.
    }
    
    public String getSurname() 
    {
        return surname;
    }
    public void setSurname(String surname)
    {
        this.surname = surname;
    }

    public String getGivenName() 
    {
        return givenName;
    }
    public void setGivenName(String givenName) 
    {
        this.givenName = givenName;
    }
    public String getEmail() 
    {
        return email;
    }
    public void setEmail(String email)
    {
        this.email = email;
    }
    public String getLoginID() 
    {
        return loginID;
    }
    public void setLoginID(String loginID) 
    {
        this.loginID = loginID;
    }
    public String getPassword() 
    {
        return password;
    }
    public void setPassword(String password) 
    {
        this.password = password;
    }
    public Status getStatus()
    {
        return status;
    }
    public void setStatus(Status status) 
    {
        this.status = status;
    }
    public void setOnline() 
    {
        this.setStatus(Status.ONLINE);   
    }
    public void setOffline() 
    {
        this.setStatus(Status.OFFLINE);
    }    
}