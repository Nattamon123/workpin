# 🎨 คำแนะนำการปรับแต่งและพัฒนาเพิ่มเติม

## 📝 การแก้ไขข้อมูลส่วนตัว

### 1. แก้ไขข้อมูลนักศึกษา
แก้ไขไฟล์ `src/data/studentData.js`:

```javascript
export const studentData = {
  name: "ชื่อจริง สกุลจริง",
  studentId: "66xxxxxxxxx",
  year: "ปี 2",
  major: "วิทยาการคอมพิวเตอร์",
  faculty: "คณะวิทยาศาสตร์",
  university: "มหาวิทยาลัยของคุณ",
  profileImage: "https://via.placeholder.com/200", // หรือ import จาก assets
  introduction: [
    "ย่อหน้าที่ 1 แนะนำตัวเอง...",
    "ย่อหน้าที่ 2 เพิ่มเติม..."
  ]
};
```

### 2. เพิ่มรูปโปรไฟล์ของตัวเอง

**วิธีที่ 1: ใช้ URL จากอินเทอร์เน็ต**
```javascript
profileImage: "https://example.com/your-photo.jpg"
```

**วิธีที่ 2: ใช้รูปในโฟลเดอร์ assets**
1. วางไฟล์รูป (เช่น `profile.jpg`) ไว้ใน `src/assets/`
2. แก้ไขไฟล์ `src/data/studentData.js`:
```javascript
import profileImage from '../assets/profile.jpg';

export const studentData = {
  // ...
  profileImage: profileImage,
  // ...
};
```

### 3. แก้ไขข้อมูลรายวิชา
แก้ไขในไฟล์ `src/data/studentData.js`:
```javascript
export const courseData = {
  code: "CSC105",
  name: "Computer Programming"
};
```

### 4. แก้ไข Social Media Links
แก้ไขในไฟล์ `src/data/studentData.js`:
```javascript
export const footerData = {
  // ...
  socialMedia: [
    {
      name: "Facebook",
      url: "https://www.facebook.com/your-profile",
      icon: "📘"
    },
    {
      name: "GitHub",
      url: "https://github.com/your-username",
      icon: "💻"
    },
    {
      name: "Line",
      url: "https://line.me/your-id",
      icon: "💬"
    }
  ]
};
```

## 🎨 การปรับแต่ง Theme/สี

### เปลี่ยนสีหลักของเว็บไซต์

แก้ไขไฟล์ CSS ต่างๆ:

**สีหลัก (Primary Color):**
- ค้นหา `#667eea` และแทนที่ด้วยสีที่ต้องการ

**สีรอง (Secondary Color):**
- ค้นหา `#764ba2` และแทนที่ด้วยสีที่ต้องการ

**ตัวอย่างการเปลี่ยนสีใน `src/layouts/MainLayout.css`:**
```css
.header {
    background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}
```

## 🔧 การพัฒนา Components เพิ่มเติม

### ปรับปรุง Temperature Component

ไฟล์ปัจจุบันที่ `src/components/Component/Tempature.jsx` ยังไม่ได้แปลงหน่วยอุณหภูมิ

**ตัวอย่างการปรับปรุง:**

```javascript
import { useState } from "react";
import Value from "./Value";

const Temperature = () => {
  const [celsius, setCelsius] = useState(0);

  // คำนวณค่าอุณหภูมิในหน่วยอื่น
  const fahrenheit = (celsius * 9/5) + 32;
  const kelvin = celsius + 273.15;

  const handleCelsiusChange = (value) => {
    setCelsius(value);
  };

  const handleFahrenheitChange = (value) => {
    setCelsius((value - 32) * 5/9);
  };

  const handleKelvinChange = (value) => {
    setCelsius(value - 273.15);
  };

  return (
    <div className="border border-black border-2 mx-auto mt-3 rounded-4"
         style={{ width: "fit-content" }}>
      <h1 className="text-center">Temperature</h1>
      
      <div className="d-flex justify-content-between p-3">
        <div className="badge bg-info d-flex justify-content-center align-items-center"
             style={{ height: "50px", width: "100px" }}>
          {celsius.toFixed(2)}℃
        </div>
        <div className="badge bg-warning d-flex justify-content-center align-items-center"
             style={{ height: "50px", width: "100px" }}>
          {fahrenheit.toFixed(2)}°F
        </div>
        <div className="badge bg-success d-flex justify-content-center align-items-center"
             style={{ height: "50px", width: "100px" }}>
          {kelvin.toFixed(2)}°K
        </div>
      </div>

      <div className="d-flex gap-2 justify-content-center">
        <Value 
          name={"CELSIUS"} 
          initial={celsius}
          onChange={handleCelsiusChange} 
          type={"real"}
        />
        <Value 
          name={"FAHRENHEIT"} 
          initial={fahrenheit}
          onChange={handleFahrenheitChange} 
          type={"real"}
        />
        <Value 
          name={"KELVIN"} 
          initial={kelvin}
          onChange={handleKelvinChange} 
          type={"real"}
        />
      </div>
    </div>
  );
};

export default Temperature;
```

### ปรับปรุง Value Component

แก้ไขไฟล์ `src/components/Component/Value.jsx` เพื่อรองรับการเปลี่ยนค่าจาก props:

```javascript
import { useEffect, useState } from "react";

const Value = ({ name, initial, type, onChange }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(initial || 0);
  }, [initial]);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const increment = () => {
    const step = type === 'real' ? 0.1 : 1;
    const newValue = value + step;
    handleChange(newValue);
  };

  const decrement = () => {
    const step = type === 'real' ? 0.1 : 1;
    const newValue = value - step;
    handleChange(newValue);
  };

  return (
    <div className="border border-black border-2 m-auto rounded-4 mt-3 p-2"
         style={{ width: "fit-content" }}>
      <h1 className="text-primary text-center">{name}</h1>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <button className="btn btn-danger" onClick={decrement}>
          &minus;
        </button>
        <div style={{ minWidth: "80px", textAlign: "center" }}>
          {type === "real" ? value.toFixed(2) : Math.round(value)}
        </div>
        <button className="btn btn-success" onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
};

export default Value;
```

## 📱 การเพิ่ม Calculator และ Animation จากงาน Week 3, 4

หากคุณมีงาน Calculator และ Animation จาก Week 3, 4 อยู่แล้ว:

### แทนที่ Calculator
1. คัดลอกโค้ดจากงาน Week 3
2. แปลงเป็น React Component
3. แทนที่ไฟล์ `src/pages/Calculator.jsx`

### แทนที่ Animation
1. คัดลอกโค้ดจากงาน Week 4
2. แปลงเป็น React Component
3. แทนที่ไฟล์ `src/pages/Animation.jsx`

## 🚀 การเพิ่มหน้าใหม่

### 1. สร้างไฟล์ Component ใหม่
สร้างไฟล์ `src/pages/NewPage.jsx`:
```javascript
import './NewPage.css';

function NewPage() {
  return (
    <div className="new-page">
      <h2 className="page-title">หน้าใหม่</h2>
      <p>เนื้อหาของหน้าใหม่...</p>
    </div>
  );
}

export default NewPage;
```

### 2. สร้างไฟล์ CSS
สร้างไฟล์ `src/pages/NewPage.css`:
```css
.new-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
```

### 3. เพิ่ม Route
แก้ไขไฟล์ `src/App.jsx`:
```javascript
import NewPage from "./pages/NewPage";

// ใน Routes
<Route path="new-page" element={<NewPage />} />
```

### 4. เพิ่มลิงก์ใน Navbar
แก้ไขไฟล์ `src/layouts/MainLayout.jsx`:
```javascript
<li className="nav-item">
  <Link to="/new-page" className="nav-link">
    New Page
  </Link>
</li>
```

## 🎯 Tips & Best Practices

### 1. การจัดการ State
- ใช้ `useState` สำหรับ local state
- ใช้ `useEffect` สำหรับ side effects
- ส่ง callback functions ผ่าน props เพื่ออัปเดต parent state

### 2. การตั้งชื่อ
- Component ใช้ PascalCase: `MyComponent`
- ไฟล์ใช้ชื่อเดียวกับ Component: `MyComponent.jsx`
- CSS ใช้ชื่อเดียวกัน: `MyComponent.css`

### 3. การจัดโครงสร้างโฟลเดอร์
```
src/
├── components/     # Reusable components
├── pages/          # Page components
├── layouts/        # Layout components
├── data/           # Static data
└── assets/         # Images, fonts, etc.
```

### 4. CSS Best Practices
- ใช้ className ที่มีความหมาย
- หลีกเลี่ยง inline styles ถ้าไม่จำเป็น
- ใช้ CSS variables สำหรับสีและค่าที่ใช้ซ้ำ

### 5. Performance
- ใช้ React.memo() สำหรับ components ที่ render บ่อย
- ใช้ useCallback() และ useMemo() เมื่อจำเป็น
- Lazy load components ที่ไม่จำเป็นต้องโหลดทันที

## 🐛 Debugging Tips

### ปัญหาที่พบบ่อย

**1. Component ไม่ update**
- ตรวจสอบว่ามีการเรียก setState หรือไม่
- ตรวจสอบ dependencies ใน useEffect

**2. CSS ไม่ทำงาน**
- ตรวจสอบว่า import CSS ไฟล์แล้วหรือยัง
- ตรวจสอบชื่อ className ว่าถูกต้อง
- ตรวจสอบ specificity ของ CSS

**3. Router ไม่ทำงาน**
- ตรวจสอบว่าครอบด้วย `<BrowserRouter>` แล้ว
- ตรวจสอบ path ว่าถูกต้อง
- ตรวจสอบว่า import component แล้ว

**4. Bootstrap styles ไม่แสดง**
- ตรวจสอบว่า import 'bootstrap/dist/css/bootstrap.min.css' ใน main.jsx แล้ว
- ตรวจสอบว่าติดตั้ง bootstrap package แล้ว

## 📚 Resources

- [React Docs](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Bootstrap Docs](https://getbootstrap.com/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)

## 💡 ไอเดียการพัฒนาเพิ่มเติม

1. **เพิ่ม Dark Mode**
   - ใช้ Context API หรือ useState
   - Toggle ระหว่าง light/dark theme

2. **เพิ่ม Animation เมื่อเปลี่ยนหน้า**
   - ใช้ CSS transitions
   - ใช้ library เช่น framer-motion

3. **เพิ่ม Loading State**
   - แสดง spinner เมื่อกำลังโหลด
   - ใช้ Suspense และ lazy loading

4. **เพิ่ม Form Validation**
   - ตรวจสอบข้อมูลก่อน submit
   - แสดง error messages

5. **เพิ่ม Local Storage**
   - บันทึกข้อมูลลง localStorage
   - โหลดข้อมูลเมื่อเปิดหน้าใหม่

6. **Responsive Navigation**
   - เพิ่ม hamburger menu สำหรับมือถือ
   - ใช้ sidebar แทน top navbar

7. **เพิ่ม Search/Filter**
   - ค้นหาข้อมูล
   - Filter ข้อมูลตามเงื่อนไข

8. **เพิ่ม Animation Library**
   - AOS (Animate on Scroll)
   - Framer Motion
   - React Spring

---

**Happy Coding! 🚀**

หากมีคำถามหรือต้องการความช่วยเหลือเพิ่มเติม สามารถศึกษาจาก documentation หรือถามอาจารย์ได้เลยครับ/ค่ะ