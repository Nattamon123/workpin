# 📁 โครงสร้างโปรเจค Week 7 - React Router Application

## 📂 Directory Structure

```
w07/
├── public/                          # Static files
├── src/
│   ├── assets/                      # Images, fonts, icons
│   │   └── react.svg
│   │
│   ├── components/                  # Reusable components
│   │   ├── Animation/              # งาน Animation Week 4 (ถ้ามี)
│   │   ├── Calculator/             # งาน Calculator Week 3 (ถ้ามี)
│   │   └── Component/              # งาน Components Week 6
│   │       ├── Adder.jsx           # Component บวกเลข A + B
│   │       ├── App.css             # CSS สำหรับ Components
│   │       ├── App1.jsx            # Main component ที่รวม components ทั้งหมด
│   │       ├── RadixCounter.jsx    # Component นับเลข
│   │       ├── Tempature.jsx       # Component แปลงหน่วยอุณหภูมิ
│   │       ├── Timer.jsx           # Component นับเวลา
│   │       ├── Value.jsx           # Component เพิ่ม-ลดค่า
│   │       ├── index.css
│   │       └── main.jsx
│   │
│   ├── data/                        # Static data & configuration
│   │   └── studentData.js          # ข้อมูลนักศึกษา, รายวิชา, footer
│   │
│   ├── layouts/                     # Layout components
│   │   ├── MainLayout.jsx          # Layout หลัก (Header, Navbar, Outlet, Footer)
│   │   └── MainLayout.css          # Styles สำหรับ Layout
│   │
│   ├── pages/                       # Page components (Routes)
│   │   ├── Home.jsx                # หน้าแนะนำตัว
│   │   ├── Home.css
│   │   ├── Calculator.jsx          # หน้า Calculator (Week 3)
│   │   ├── Calculator.css
│   │   ├── Animation.jsx           # หน้า Animation (Week 4)
│   │   ├── Animation.css
│   │   ├── Component.jsx           # หน้า Components (Week 6)
│   │   └── Component.css
│   │
│   ├── App.jsx                      # Main App component with Router setup
│   ├── App.css                      # Global app styles
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global CSS reset & base styles
│
├── .gitignore
├── CUSTOMIZATION.md                 # คำแนะนำการปรับแต่ง
├── PROJECT_STRUCTURE.md             # ไฟล์นี้
├── README.md                        # คำแนะนำการใช้งาน
├── eslint.config.js
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── package-lock.json
└── vite.config.js                   # Vite configuration
```

## 🎯 Component Overview

### Layouts
- **MainLayout.jsx**: Layout หลักที่มี Header, Navbar, Outlet และ Footer

### Pages
- **Home**: หน้าแนะนำตัวนักศึกษา (รูป, รหัส, ชื่อ, ข้อมูล)
- **Calculator**: เครื่องคิดเลขแบบ iOS (Week 3)
- **Animation**: แอนิเมชัน 6 แบบ - Bounce, Rotate, Slide, Fade, Scale, Shake (Week 4)
- **Component**: แสดง Components จาก Week 6 (Value, Adder, Timer, Temperature)

### Week 6 Components
- **Value.jsx**: Component นับเลข (เพิ่ม/ลด) รองรับทั้งจำนวนเต็มและทศนิยม
- **Adder.jsx**: Component บวกเลข 2 ตัว (A + B)
- **Timer.jsx**: Component นับเวลา (นาที:วินาที)
- **Tempature.jsx**: Component แปลงหน่วยอุณหภูมิ
- **RadixCounter.jsx**: Component นับเลขในระบบต่างๆ

## 🔄 Data Flow

```
main.jsx
  └── App.jsx (BrowserRouter, Routes)
      └── MainLayout.jsx (Header, Navbar, Footer)
          └── Outlet (แสดง Pages ตาม Route)
              ├── Home.jsx (ใช้ data จาก studentData.js)
              ├── Calculator.jsx
              ├── Animation.jsx
              └── Component.jsx (import App1 จาก components/Component)
                  └── App1.jsx
                      ├── Value.jsx
                      ├── Adder.jsx (ใช้ Value.jsx ซ้อน)
                      ├── Timer.jsx
                      └── Tempature.jsx (ใช้ Value.jsx ซ้อน)
```

## 📋 Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | หน้าแนะนำตัว |
| `/calculator` | Calculator | เครื่องคิดเลข (Week 3) |
| `/animation` | Animation | แอนิเมชัน (Week 4) |
| `/component` | Component | Components (Week 6) |

## 🎨 Styling

### CSS Files Organization
- **index.css**: Global reset และ base styles
- **App.css**: Global app-level styles
- **MainLayout.css**: Styles สำหรับ Header, Navbar, Footer
- **Home.css**: Styles สำหรับหน้า Home
- **Calculator.css**: Styles สำหรับ Calculator
- **Animation.css**: Styles สำหรับ Animation และ @keyframes
- **Component.css**: Styles สำหรับหน้า Component

### External CSS
- **Bootstrap 5**: สำหรับ Component Week 6
- **Bootstrap Icons**: สำหรับ icons ใน Timer

### Color Scheme
```css
Primary Color: #667eea
Secondary Color: #764ba2
Background: #f5f7fa
Text: #2c3e50
Light Text: #7f8c8d
Dark BG: #2c3e50
```

## 🔧 Configuration Files

### package.json
Dependencies:
- react: ^19.1.1
- react-dom: ^19.1.1
- react-router-dom: ^7.9.4
- bootstrap: ^5.3.x
- bootstrap-icons: ^1.13.1

DevDependencies:
- vite: ^7.1.7
- @vitejs/plugin-react: ^5.0.4
- eslint: ^9.36.0

### vite.config.js
- React plugin configuration
- Build settings

## 📝 Key Features

### 1. Responsive Design
- Desktop (> 768px)
- Tablet (768px - 480px)
- Mobile (< 480px)

### 2. React Router
- BrowserRouter
- Nested Routes
- Outlet component

### 3. Component Composition
- Reusable components
- Props passing
- State management with useState
- Side effects with useEffect

### 4. Styling Approaches
- CSS Modules (separate CSS files)
- Bootstrap classes
- Inline styles (เฉพาะที่จำเป็น)
- CSS animations และ transitions

## 🚀 Scripts

```bash
# Development
npm run dev          # เริ่ม dev server ที่ http://localhost:5173

# Build
npm run build        # Build สำหรับ production ไปยัง dist/

# Preview
npm run preview      # Preview production build

# Lint
npm run lint         # ตรวจสอบ code quality
```

## 📦 Build Output

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css      # Bundled CSS
│   ├── index-[hash].js       # Bundled JavaScript
│   ├── bootstrap-icons.woff
│   └── bootstrap-icons.woff2
```

## 🔍 Important Notes

### 1. การแก้ไขข้อมูล
- **ข้อมูลนักศึกษา**: แก้ที่ `src/data/studentData.js`
- **สี/Theme**: แก้ที่ไฟล์ CSS แต่ละหน้า
- **เพิ่มหน้าใหม่**: สร้างใน `src/pages/` และเพิ่ม Route ใน `App.jsx`

### 2. Bootstrap Integration
- Import ใน `main.jsx`
- ใช้ใน Components Week 6 เท่านั้น
- หน้าอื่นใช้ Custom CSS

### 3. Component Reusability
- Value component ถูกใช้ซ้ำใน Adder และ Tempature
- สามารถนำ components ไปใช้ในหน้าอื่นได้

### 4. State Management
- ใช้ useState สำหรับ local state
- ส่ง callbacks ผ่าน props เพื่อ update parent state
- ไม่ได้ใช้ Context API หรือ Redux

## 📚 Learning Objectives

### Week 3 - Calculator
✅ Event Handling
✅ State Management
✅ Conditional Rendering

### Week 4 - Animation
✅ CSS Animations
✅ @keyframes
✅ JavaScript-triggered animations
✅ React State for animation control

### Week 6 - Components
✅ Component Composition
✅ Props
✅ State lifting
✅ useEffect hook
✅ Callback props

### Week 7 - Router
✅ React Router DOM
✅ Nested Routes
✅ Layout Components
✅ Link และ Navigation
✅ Outlet component

## 🎓 Best Practices Used

1. **Component Organization**: แยก components ตาม feature และ reusability
2. **File Naming**: PascalCase สำหรับ components, camelCase สำหรับ utilities
3. **CSS Scoping**: แต่ละ component มี CSS file ของตัวเอง
4. **Data Separation**: แยกข้อมูล static ไว้ใน data/
5. **Responsive Design**: ใช้ media queries สำหรับทุกหน้า
6. **Semantic HTML**: ใช้ tags ที่มีความหมาย (header, nav, main, footer)
7. **Accessibility**: ใช้ aria-labels และ alt text ที่เหมาะสม

## 🐛 Common Issues & Solutions

### Issue 1: Bootstrap styles ไม่แสดง
**Solution**: ตรวจสอบว่า import 'bootstrap/dist/css/bootstrap.min.css' ใน main.jsx

### Issue 2: Router ไม่ทำงาน
**Solution**: ตรวจสอบว่าครอบด้วย BrowserRouter และ path ถูกต้อง

### Issue 3: Components ไม่ update
**Solution**: ตรวจสอบว่าเรียก setState และ dependencies ใน useEffect

### Issue 4: CSS conflicts
**Solution**: ใช้ชื่อ class ที่ specific หรือใช้ CSS modules

## 🔄 Version History

- **v1.0.0**: Initial setup with all pages and components
  - Home page with student info
  - Calculator (Week 3)
  - Animation (Week 4)
  - Components (Week 6)
  - React Router integration
  - Responsive design

## 📞 Contact & Support

- อ่าน README.md สำหรับการใช้งาน
- อ่าน CUSTOMIZATION.md สำหรับการปรับแต่ง
- ดู code comments ใน source files
- อ้างอิง React docs: https://react.dev/

---

**Created for CSC105 - Computer Programming**

Last Updated: 2024