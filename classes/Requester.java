public class Requester 
{
    public enum Type
    {
        MASTERS, PHD
    }
    
    private Type type;
    private int studentNumber;
    private String academicUnit;
    private String program;
    private int sessionNumber;
    private int supervisor; // correspond au empNumber du Supervisor responsable
    private String thesisTopic;
    private int bankAccountNumber;
    
    public Requester (Type type, int studentNum, String academic, String program, int session, int supervisorNum, String topic, int bankNum)
    {
        this.setType(type);
        this.setStudentNumber(studentNum);
        this.setAcademicUnit(academic);
        this.setProgram(program);
        this.setSessionNumber(session);
        this.setSupervisor(supervisorNum);
        this.setThesisTopic(topic);
        this.setBankAccountNumber(bankNum);
    }

    public Type getType() 
    {
        return type;
    }
    public void setType(Type type)
    {
        this.type = type;
    }
    public int getStudentNumber() 
    {
        return studentNumber;
    }
    public void setStudentNumber(int studentNumber)
    {
        this.studentNumber = studentNumber;
    }
    public String getAcademicUnit() 
    {
        return academicUnit;
    }
    public void setAcademicUnit(String academicUnit) 
    {
        this.academicUnit = academicUnit;
    }
    public String getProgram() 
    {
        return program;
    }
    public void setProgram(String program) 
    {
        this.program = program;
    }
    public int getSessionNumber() 
    {
        return sessionNumber;
    }
    public void setSessionNumber(int sessionNumber)
    {
        this.sessionNumber = sessionNumber;
    }
    public int getSupervisor() 
    {
        return supervisor;
    }
    public void setSupervisor(int supervisor) 
    {
        this.supervisor = supervisor;
    }
    public String getThesisTopic() 
    {
        return thesisTopic;
    }
    public void setThesisTopic(String thesisTopic)
    {
        this.thesisTopic = thesisTopic;
    }
    public int getBankAccountNumber() 
    {
        return bankAccountNumber;
    }
    public void setBankAccountNumber(int bankAccountNumber) 
    {
        this.bankAccountNumber = bankAccountNumber;
    }   
}