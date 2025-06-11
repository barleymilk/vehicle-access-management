# 차량 출입 관리 시스템 데이터베이스 스키마

## 1. 개선된 테이블 구조

### 1.1 핵심 테이블

#### People (사람 정보)

```sql
CREATE TABLE people (
  person_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20),
  organization VARCHAR(200),
  department VARCHAR(100),
  position VARCHAR(100),
  photo_path VARCHAR(500),
  vip_level VARCHAR(20) DEFAULT 'none', -- none, family, special
  is_worker BOOLEAN DEFAULT false,
  activity_start_date TIMESTAMP,
  activity_end_date TIMESTAMP,
  contact_person_name VARCHAR(100), -- 내부 담당자
  contact_person_phone VARCHAR(20),
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, blocked
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Vehicles (차량 정보)

```sql
CREATE TABLE vehicles (
  vehicle_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plate_number VARCHAR(15) UNIQUE NOT NULL,
  vehicle_type VARCHAR(50), -- sedan, suv, truck, van, motorcycle
  is_public_vehicle BOOLEAN DEFAULT false,
  owner_department VARCHAR(100),
  access_start_date TIMESTAMP,
  access_end_date TIMESTAMP,
  is_free_pass_enabled BOOLEAN DEFAULT false, -- FREE PASS 차량 여부
  special_notes TEXT,
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, blocked, expired
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Works (작업 정보)

```sql
CREATE TABLE works (
  work_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_title VARCHAR(200) NOT NULL,
  work_description TEXT,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  contractor_company VARCHAR(200),
  responsible_person_name VARCHAR(100),
  responsible_person_phone VARCHAR(20),
  security_team_informed BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, in_progress, completed, cancelled
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 1.2 관계 테이블

#### Person_Vehicle (사람-차량 관계)

```sql
CREATE TABLE person_vehicle (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID REFERENCES people(person_id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
  relationship_type VARCHAR(20) NOT NULL, -- owner, driver
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(person_id, vehicle_id)
);
```

#### Person_Work (사람-작업 관계)

```sql
CREATE TABLE person_work (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID REFERENCES people(person_id) ON DELETE CASCADE,
  work_id UUID REFERENCES works(work_id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, in_progress, completed, cancelled
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(person_id, work_id)
);
```

### 1.3 출입 기록 테이블

#### Access_Records (출입 기록)

```sql
CREATE TABLE access_records (
  access_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- 등록된 정보 (Optional)
  vehicle_id UUID REFERENCES vehicles(vehicle_id),
  person_id UUID REFERENCES people(person_id),
  work_id UUID REFERENCES works(work_id),

  -- 미등록 정보 (Fallback)
  raw_plate_number VARCHAR(15) NOT NULL, -- 항상 저장
  raw_vehicle_type VARCHAR(50), -- 차량 종류 (sedan, suv, truck, van, motorcycle)
  raw_person_name VARCHAR(100), -- 미등록시 필수
  raw_person_phone VARCHAR(20), -- 운전자 전화번호
  driver_organization VARCHAR(200), -- 운전자 소속

  -- 공통 정보
  access_time TIMESTAMP NOT NULL DEFAULT NOW(),
  passengers TEXT, -- 동승자 (JSON 배열 또는 텍스트)
  purpose VARCHAR(200), -- 방문 목적
  approved_by UUID REFERENCES users(user_id),
  is_free_pass BOOLEAN DEFAULT false,
  is_registered BOOLEAN DEFAULT true, -- 등록 여부 플래그
  notes TEXT, -- 특이 사항
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 1.4 시스템 테이블

#### Users (시스템 사용자)

```sql
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'operator', -- super_admin, admin, manager, operator
  department VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 2. TypeScript 타입 정의

### 2.1 기본 Entity 타입

```typescript
// lib/types/database.ts
export interface Person {
  personId: string;
  name: string;
  phoneNumber?: string;
  organization?: string;
  department?: string;
  position?: string;
  photoPath?: string;
  vipLevel: VipLevel;
  isWorker: boolean;
  activityStartDate?: Date;
  activityEndDate?: Date;
  contactPersonName?: string;
  contactPersonPhone?: string;
  status: "active" | "inactive" | "blocked";
  createdAt: Date;
  updatedAt: Date;
}

export enum VipLevel {
  NONE = "none",
  FAMILY = "family", // 가족 관계자
  SPECIAL = "special", // 특별 관리 대상 (VIP)
}

export interface Vehicle {
  vehicleId: string;
  plateNumber: string;
  vehicleType?: VehicleType;
  fuelType?: FuelType;
  color?: string;
  manufacturer?: string;
  model?: string;
  isPublicVehicle: boolean;
  ownerDepartment?: string;
  accessStartDate?: Date;
  accessEndDate?: Date;
  isFreePassEnabled: boolean; // 추가
  specialNotes?: string;
  status: "active" | "inactive" | "blocked" | "expired";
  createdAt: Date;
  updatedAt: Date;
}

export interface Work {
  workId: string;
  workTitle: string;
  workDescription?: string;
  startDate?: Date;
  endDate?: Date;
  contractorCompany?: string;
  responsiblePersonName?: string;
  responsiblePersonPhone?: string;
  securityTeamInformed: boolean;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.2 관계 타입

```typescript
export interface PersonVehicle {
  id: string;
  personId: string;
  vehicleId: string;
  relationshipType: "owner" | "driver";
  createdAt: Date;
}

export interface PersonWork {
  id: string;
  personId: string;
  workId: string;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  createdAt: Date;
}

export interface AccessRecord {
  accessId: string;
  // 등록된 정보 (Optional)
  vehicleId?: string;
  personId?: string;
  workId?: string;

  // 미등록 정보 (Fallback)
  rawPlateNumber: string; // 항상 저장
  rawVehicleType?: string; // 차량 종류
  rawPersonName?: string; // 미등록시 필수
  rawPersonPhone?: string; // 운전자전화번호
  driverOrganization?: string; // 운전자소속

  // 공통 정보
  accessTime: Date;
  passengers?: string; // 동승자
  purpose?: string; // 방문목적
  approvedBy?: string;
  isFreePass: boolean;
  isRegistered: boolean; // 등록 여부 플래그
  notes?: string; // 특이사항
  createdAt: Date;
}
```

## 3. 인덱스 및 제약조건

### 3.1 성능 최적화 인덱스

```sql
-- 검색 성능 향상
CREATE INDEX idx_vehicles_plate_number ON vehicles(plate_number);
CREATE INDEX idx_people_name ON people(name);
CREATE INDEX idx_people_phone ON people(phone_number);
CREATE INDEX idx_access_records_time ON access_records(access_time);
CREATE INDEX idx_access_records_vehicle ON access_records(vehicle_id);
CREATE INDEX idx_vehicles_free_pass ON vehicles(is_free_pass_enabled);

-- 복합 인덱스
CREATE INDEX idx_person_vehicle_lookup ON person_vehicle(vehicle_id, person_id);
```

### 3.2 데이터 무결성 제약조건

```sql
-- 차량 번호 유효성 검사 (유연한 형식 허용)
ALTER TABLE vehicles ADD CONSTRAINT chk_plate_format
  CHECK (
    plate_number ~ '^[0-9]{4}$' OR                           -- 숫자 4자리 (예: 1234)
    plate_number ~ '^[0-9]{2,3}[가-힣][0-9]{4}$' OR        -- 표준 한국 번호판 (예: 12가3456)
    LENGTH(plate_number) >= 4                                -- 최소 4자리 이상
  );

-- 작업 일정 검사
ALTER TABLE works ADD CONSTRAINT chk_work_dates
  CHECK (start_date <= end_date);
```
