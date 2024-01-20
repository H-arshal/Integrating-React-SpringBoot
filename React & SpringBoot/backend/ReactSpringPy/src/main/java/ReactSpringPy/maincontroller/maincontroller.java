package ReactSpringPy.maincontroller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import ReactSpringPy.entity.student;
import ReactSpringPy.repo.repos;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:3000")
public class maincontroller {
	@Autowired
	private repos std;

	@PostMapping("/")
	public ResponseEntity<?> addStudent(@Valid @RequestBody student student, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
		}
		student existingStudent = std.findByRegNo(student.getRegNo());
		if (existingStudent != null) {
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body("Student with this Registration Number already exists");
		}
		student savedStudent = std.save(student);
		return ResponseEntity.ok(savedStudent);
	}
	@GetMapping("/")
	public ResponseEntity<?> getStudent() {
		return ResponseEntity.ok(this.std.findAll());
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable String id) {
		try {
			std.deleteById(id);
			return ResponseEntity.ok("Student deleted successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting student");
		}
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updateStudent(@PathVariable String id, @RequestBody student updatedStudent) {
		System.out.println("Here bro");
		try {
			student existingStudent = std.findByRegNo(id);
			if (existingStudent != null) {
				existingStudent.setName(updatedStudent.getName());
				existingStudent.setBranch(updatedStudent.getBranch());
				existingStudent.setEmail(updatedStudent.getEmail());
				existingStudent.setPhone(updatedStudent.getPhone());
				std.save(existingStudent);
				return ResponseEntity.ok("Student updated successfully");
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating student");
		}
	}
}