
import java.util.LinkedList;

public class Supervisor extends PermittedUser
{
    static int EMPNUMBERCOUNTER = 0;
    
    private int empNumber;
    private LinkedList<Integer> grantAccountNumbers;
    
    public Supervisor (String surname, String givenName, String email, String loginID, String password)
    {
        EMPNUMBERCOUNTER++;
        this.setOffline(); // par defaut
        this.setSurname(surname);
        this.setGivenName(givenName);
        this.setEmail(email);
        this.setLoginID(loginID);
        this.setPassword(password);
        this.empNumber = EMPNUMBERCOUNTER;
        this.grantAccountNumbers = new LinkedList<Integer>();
    }

    public int getEmpNumber()
    {
        return empNumber;
    }
    public void setEmpNumber(int empNumber) 
    {
        this.empNumber = empNumber;
    }
    public LinkedList<Integer> getGrantAccountNumbers() 
    {
        return grantAccountNumbers;
    }
    public void setGrantAccountNumbers(LinkedList<Integer> grantAccountNumbers)
    {
        this.grantAccountNumbers = grantAccountNumbers;
    }
}
