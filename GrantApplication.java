
import java.util.LinkedList;

public class GrantApplication 
{
    enum Stage 
    {
        PREAPPROVAL, REIMBURSEMENT
    }
    enum Status //correspond au status d'un application (ne pas confondre avec ONLINE et OFFLINE des autres classes)
    {
        STARTED, CANCELLED, PENDING_SUPERVISOR, PENDING_FGPS, FINANCIAL_OFFICE, ARCHIVED 
        //Completed is not actually a status, i can explain if needed in person.
    } 
    enum PresentationType
    {
        POSTER, VERBAL
    }
    public class Expense // classe interne
    {
        private String description;
        private double amount;
        
        public Expense (String desc, double amount)
        {
            this.setDescription(description);
            this.setAmount(amount);
        }
        public String getDescription()
        {
            return description;
        }
        public void setDescription(String description) 
        {
            this.description = description;
        }
        public double getAmount()
        {
            return amount;
        }
        public void setAmount(double amount)
        {
            this.amount = amount;
        } 
    }
    
    private Stage stage;
    private Status status;
    private String presentationTitle;
    private boolean requestAdvanceFunds; //True pour Oui.
    private PresentationType presentationType; 
    private LinkedList<Expense> listOfExpenses;
    
    public GrantApplication(String title, boolean advance, PresentationType presType)
    {
        this.setStage(Stage.PREAPPROVAL);
        this.setStatus(Status.STARTED);
        this.setPresentationTitle(title);
        this.setRequestAdvanceFunds(advance);
        this.setPresentationType(presType);
        this.listOfExpenses = new LinkedList<Expense>();
    }
    
    public Stage getStage() 
    {
        return stage;
    }
    public void setStage(Stage stage) 
    {
        this.stage = stage;
    }
    public Status getStatus() 
    {
        return status;
    }
    public void setStatus(Status status) 
    {
        this.status = status;
    }
    public String getPresentationTitle()
    {
        return presentationTitle;
    }
    public void setPresentationTitle(String presentationTitle)
    {
        this.presentationTitle = presentationTitle;
    }
    public boolean isRequestAdvanceFunds()
    {
        return requestAdvanceFunds;
    }
    public void setRequestAdvanceFunds(boolean requestAdvanceFunds)
    {
        this.requestAdvanceFunds = requestAdvanceFunds;
    }
    public PresentationType getPresentationType() 
    {
        return presentationType;
    }
    public void setPresentationType(PresentationType presentationType) 
    {
        this.presentationType = presentationType;
    }
    public LinkedList<Expense> getListOfExpenses()
    {
        return listOfExpenses;
    }
    public void setListOfExpenses(LinkedList<Expense> listOfExpenses) {
        this.listOfExpenses = listOfExpenses;
    }
}

// I might need a method which verifies if all information is provided,
// if so, then change status to pending_supervisor and alert the specific
// supervisor by adding that application number to their list.