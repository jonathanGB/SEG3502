public class GrantSystem 
{
    enum Status
    {
        ONLINE, OFFLINE
    }
    
    private Status status;
    
    public GrantSystem()
    {
        this.setOffline(); // offline par defaut
    }
    
    public Status getStatus() 
    {
        return status;
    }
    public void setStatus(Status stat)
    {
        this.status = stat;
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
