package ReactSpringPy.entity;
import org.springframework.data.annotation.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "StudentData")
public class student {
    @Id
    @NotBlank(message="Must Provide Regestration Number")
    private String regNo;
    @NotBlank(message = "Name cannot be blank")
    private String name;
    @NotBlank(message = "Branch cannot be blank")
    private String branch;
    @Email(message = "Invalid email format")
    private String email;
    private String phone;
	public student() {
		super();
	}
	public student(String regNo, String name, String branch, String email, String phone) {
		super();
		this.regNo = regNo;
		this.name = name;
		this.branch = branch;
		this.email = email;
		this.phone = phone;
	}
	public String getRegNo() {
		return regNo;
	}
	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	@Override
	public String toString() {
		return "student [regNo=" + regNo + ", name=" + name + ", branch=" + branch + ", email=" + email + ", phone="
				+ phone + "]";
	}
}