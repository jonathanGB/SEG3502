
import java.util.Date;

public class Conference
{
    private Date startDate;
    private Date endDate;
    private String website;
    private String location;
    private String geoZone;

    public Conference ()
    {
        // constructeur vide, since conference can be null for an application
    }
    public Conference (Date start, Date end, String website, String location)
    {
        this.setStartDate(start);
        this.setEndDate(end);
        this.setWebsite(website);
        this.setLocation(location);
    }
    public Date getStartDate() 
    {
        return startDate;
    }
    public void setStartDate(Date startDate)
    {
        this.startDate = startDate;
    }
    public Date getEndDate() 
    {
        return endDate;
    }
    public void setEndDate(Date endDate) 
    {
        this.endDate = endDate;
    }
    public String getWebsite()
    {
        return website;
    }
    public void setWebsite(String website)
    {
        this.website = website;
    }
    public String getLocation()
    {
        return location;
    }
    public void setLocation(String location) 
    {
        this.location = location;
    }
    public String getGeoZone() {
        return geoZone;
    }
    public void setGeoZone(String geoZone) {
        this.geoZone = geoZone;
    }
}