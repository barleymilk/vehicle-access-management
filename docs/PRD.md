# 차량 출입 관리 시스템 PRD (Product Requirements Document)

## 1. 프로젝트 개요

### 1.1 프로젝트 목표

차량의 출입을 체계적으로 관리하고 모니터링할 수 있는 웹 기반 관리 시스템 구축

### 1.2 타겟 사용자

- **주 사용자**: 보안 관리자, 시설 관리자
- **부 사용자**: 방문자, 직원, 시스템 관리자

### 1.3 핵심 가치 제안

- 실시간 차량 출입 모니터링
- 등록/미등록 차량 통합 관리
- VIP 및 FREE PASS 차량 특별 관리
- 효율적인 방문자 및 작업자 관리
- 데이터 기반 보고서 제공

## 2. 기능 요구사항

### 2.1 Core Features (MVP)

#### 2.1.1 차량 관리

- **차량 등록**: 번호판, 차종, 소유 부서 등 기본 정보
- **FREE PASS 설정**: 차량 정보 수정 시 FREE PASS 토글 직접 조작
- **공용/개인 차량 구분**: 부서별 차량 관리
- **차량 상태 관리**: active, inactive, blocked, expired

#### 2.1.2 사람 관리

- **사람 정보 등록**: 이름, 연락처, 소속, 부서, 직급
- **VIP 등급 설정**: 사람 정보 수정 시 VIP 등급 직접 선택
  - **None**: 일반인 (기본값)
  - **Family**: 가족 관계자 (블루 테마)
  - **Special**: VIP 대상 (골드 테마)
- **작업자 구분**: 일반 방문자와 작업자 분리 관리
- **활동 기간 설정**: 출입 허용 시작/종료일

#### 2.1.3 작업 관리

- **작업 등록**: 작업명, 설명, 기간, 외부업체 정보
- **작업 상태 관리**: scheduled, in_progress, completed, cancelled
- **보안팀 고지**: 보안팀 전달 여부 체크
- **담당자 관리**: 작업 책임자 연락처 관리

#### 2.1.4 관계 관리

- **사람-차량 관계**: owner, driver 구분
- **사람-작업 관계**: 작업별 참여자 관리 및 상태 추적

#### 2.1.5 출입 기록 관리

- **통합 출입 기록**: 등록/미등록 차량 모두 기록 가능
- **필수 정보**: 차량 번호, 출입 시간 (항상 저장)
- **등록 차량**: vehicle_id, person_id, work_id 연결
- **미등록 차량**:
  - 차량 번호 (항상 저장)
  - 운전자 이름 (필수)
  - 차량 종류, 전화번호, 소속 (선택사항)
- **공통 정보**:
  - 동승자 정보
  - 방문 목적
  - FREE PASS 사용 여부
  - 특이 사항
- **등록 여부 플래그**: 추후 데이터 정리를 위한 구분

#### 2.1.6 대시보드

- 실시간 출입 현황
- 등록/미등록 차량 구분 표시
- VIP 및 FREE PASS 차량 강조 표시
- 일일/주간/월간 통계
- 최근 출입 기록

#### 2.1.7 사용자 관리

- **권한별 관리**: super_admin, admin, manager, operator
- **부서별 접근 제어**
- **로그인/로그아웃 기능**

### 2.2 Advanced Features (Phase 2)

#### 2.2.1 미등록 데이터 관리

- **일일 미등록 리스트**: 당일 미등록 차량/사람 목록
- **정식 등록 프로세스**: 미등록 → 등록 전환 워크플로우
- **중복 확인**: 유사한 정보 자동 매칭 제안
- **데이터 품질 개선**: 점진적 데이터 보완

#### 2.2.2 알림 시스템

- VIP 차량 출입 알림
- FREE PASS 차량 활동 모니터링
- 미등록 차량 누적 알림
- 장시간 체류 알림

#### 2.2.3 보고서 생성

- 등록/미등록 차량 통계
- VIP 등급별 이용 현황
- 작업별 출입 분석
- 엑셀/PDF 내보내기

## 3. 기술 스택

### 3.1 Frontend

- **Framework**: Next.js 15.3.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React

### 3.2 Backend

- **Runtime**: Node.js
- **Database**: PostgreSQL
- **Authentication**: JWT
- **API**: REST API

### 3.3 Infrastructure

- **Deployment**: Vercel
- **Database Hosting**: Supabase
- **File Storage**: AWS S3

## 4. 정보 구조 (Information Architecture)

```
차량 출입 관리 시스템
├── 인증
│   ├── 로그인
│   └── 비밀번호 재설정
├── 대시보드
│   ├── 실시간 현황
│   ├── 등록/미등록 구분 표시
│   ├── VIP/FREE PASS 강조
│   └── 통계 위젯
├── 사람 관리
│   ├── 사람 등록
│   ├── 사람 목록
│   ├── 사람 정보 수정 (VIP 등급 포함)
│   ├── 작업자 관리
│   └── 사진 관리
├── 차량 관리
│   ├── 차량 등록
│   ├── 차량 목록
│   ├── 차량 정보 수정 (FREE PASS 포함)
│   └── 공용 차량 관리
├── 작업 관리
│   ├── 작업 등록
│   ├── 작업 목록
│   ├── 작업 상태 관리
│   └── 외부 업체 관리
├── 관계 관리
│   ├── 사람-차량 연결
│   ├── 사람-작업 연결
│   └── 관계 상태 관리
├── 출입 관리
│   ├── 통합 출입 기록 (등록/미등록)
│   ├── 실시간 모니터링
│   ├── 미등록 차량 즉시 입력
│   └── 출입 검색 및 필터
├── 미등록 데이터 관리
│   ├── 일일 미등록 목록
│   ├── 정식 등록 전환
│   └── 데이터 매칭 도구
├── 사용자 관리
│   ├── 관리자 목록
│   ├── 권한 설정
│   └── 계정 관리
├── 보고서
│   ├── 통합 통계 보고서
│   ├── VIP 이용 현황
│   └── 작업별 분석
└── 설정
    ├── 시스템 설정
    └── 알림 설정
```

## 5. 데이터 모델

### 5.1 주요 엔티티

#### People (사람 정보)

- personId: string
- name: string (이름)
- phoneNumber: string (전화번호)
- organization: string (소속)
- department: string (부서)
- position: string (직급)
- photoPath: string (사진 경로)
- vipLevel: 'none' | 'family' | 'special' (VIP 등급)
- isWorker: boolean (작업자 여부)
- activityStartDate: Date (활동 시작일)
- activityEndDate: Date (활동 종료일)
- contactPersonName: string (내부 담당자)
- contactPersonPhone: string (담당자 연락처)
- status: 'active' | 'inactive' | 'blocked' (상태)
- createdAt: Date
- updatedAt: Date

#### Vehicles (차량 정보)

- vehicleId: string
- plateNumber: string (차량 번호)
- vehicleType: string (차종: sedan, suv, truck, van, motorcycle)
- isPublicVehicle: boolean (공용 차량 여부)
- ownerDepartment: string (소유 부서)
- accessStartDate: Date (출입 허용 시작일)
- accessEndDate: Date (출입 허용 종료일)
- isFreePassEnabled: boolean (FREE PASS 사용 가능 여부)
- specialNotes: string (특이사항)
- status: 'active' | 'inactive' | 'blocked' | 'expired' (상태)
- createdAt: Date
- updatedAt: Date

#### Works (작업 정보)

- workId: string
- workTitle: string (작업명)
- workDescription: string (작업 상세 내용)
- startDate: Date (시작일)
- endDate: Date (종료일)
- contractorCompany: string (외부 업체명)
- responsiblePersonName: string (담당자 이름)
- responsiblePersonPhone: string (담당자 연락처)
- securityTeamInformed: boolean (보안팀 전달 여부)
- status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' (작업 상태)
- createdAt: Date
- updatedAt: Date

#### AccessRecords (출입 기록)

- accessId: string
- **등록된 정보 (Optional)**:
  - vehicleId: string (차량 ID)
  - personId: string (사람 ID)
  - workId: string (작업 ID)
- **미등록 정보 (Fallback)**:
  - rawPlateNumber: string (차량 번호 - 항상 저장)
  - rawVehicleType: string (차량 종류)
  - rawPersonName: string (운전자 이름)
  - rawPersonPhone: string (운전자 전화번호)
  - driverOrganization: string (운전자 소속)
- **공통 정보**:
  - accessTime: Date (출입 시간)
  - passengers: string (동승자)
  - purpose: string (방문 목적)
  - approvedBy: string (승인자 ID)
  - isFreePass: boolean (FREE PASS 사용 여부)
  - isRegistered: boolean (등록 여부 플래그)
  - notes: string (특이 사항)
  - createdAt: Date

#### Users (시스템 사용자)

- userId: string
- username: string
- email: string
- passwordHash: string
- fullName: string (전체 이름)
- role: 'super_admin' | 'admin' | 'manager' | 'operator'
- department: string (부서)
- isActive: boolean
- lastLogin: Date
- createdAt: Date
- updatedAt: Date

### 5.2 관계 테이블

#### PersonVehicle (사람-차량 관계)

- id: string
- personId: string
- vehicleId: string
- relationshipType: 'owner' | 'driver'
- createdAt: Date

#### PersonWork (사람-작업 관계)

- id: string
- personId: string
- workId: string
- status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
- createdAt: Date

## 6. 핵심 워크플로우

### 6.1 등록된 차량 출입

1. 차량 번호 입력
2. DB에서 차량 정보 조회
3. 연결된 사람 정보 확인
4. VIP/FREE PASS 여부 표시
5. 출입 승인 및 기록 저장

### 6.2 미등록 차량 출입

1. 차량 번호 입력
2. DB 조회 결과 없음
3. 미등록 차량 정보 입력 화면
4. 필수 정보 입력 (운전자명만 필수, 나머지는 선택사항)
   - 필수: 운전자명
   - 선택: 연락처, 소속, 차종, 동승자, 방문 목적, 특이사항
5. 즉시 출입 허용 및 기록 저장
6. 일일 미등록 리스트에 추가

### 6.3 미등록 → 등록 전환

1. 일일 미등록 리스트 확인
2. 정식 등록 필요 차량/사람 선택
3. 추가 정보 입력 및 보완
4. 정식 등록 완료
5. 기존 출입 기록과 연결

## 7. VIP 등급 시스템

### 7.1 VIP 등급 정의

- **None**: 일반인 (기본)
- **Family**: 가족 관계자 (블루 테마 #3b82f6)
- **Special**: VIP 대상 (골드 테마 #f59e0b)

### 7.2 UI 표시 방식

- 배지 형태로 시각적 구분
- 색상 테마 적용
- 리스트에서 우선 표시

## 8. FREE PASS 시스템

### 8.1 운영 방식

- **단순 boolean 방식**: 활성화/비활성화만 관리
- **기간 제한 없음**: 복잡한 유효기간 관리 제거
- **시각적 강조**: UI에서 FREE PASS 차량 명확히 표시

### 8.2 보안 관리

- FREE PASS 차량 출입 시 특별 표시
- 보안팀 실시간 모니터링
- 출입 기록에 FREE PASS 사용 여부 기록

## 9. 우선순위 매트릭스

### 9.1 High Priority (P0 - MVP)

- [x] 프로젝트 설정 및 기본 구조
- [ ] 사용자 인증 시스템
- [ ] 사람/차량/작업 CRUD
- [ ] 통합 출입 기록 관리 (등록/미등록)
- [ ] VIP 등급 관리
- [ ] FREE PASS 설정
- [ ] 기본 대시보드

### 9.2 Medium Priority (P1)

- [ ] 미등록 데이터 관리 도구
- [ ] 관계 관리 기능
- [ ] 고급 검색 및 필터링
- [ ] 상세 통계 및 차트
- [ ] 알림 시스템

### 9.3 Low Priority (P2)

- [ ] 보고서 생성 및 내보내기
- [ ] 자동 매칭 시스템
- [ ] 모바일 반응형 최적화
- [ ] 성능 최적화

## 10. 성공 지표 (KPI)

### 10.1 운영 효율성

- 미등록 차량 처리 시간: < 3분
- 등록 차량 출입 승인 시간: < 30초
- 일일 미등록 → 등록 전환율: > 80%

### 10.2 시스템 성능

- 페이지 로딩 시간: < 2초
- 시스템 가용성: > 99.5%
- 동시 사용자 지원: 50명

### 10.3 데이터 품질

- 출입 기록 정확도: > 99%
- VIP 관리 정확도: > 95%
- FREE PASS 추적 정확도: > 100%

## 11. 릴리즈 계획

### Phase 1 (MVP) - 4주

- 사용자 인증
- 기본 CRUD (사람, 차량, 작업)
- 통합 출입 기록 시스템
- VIP 등급 및 FREE PASS 관리
- 기본 대시보드

### Phase 2 - 3주

- 미등록 데이터 관리 도구
- 관계 관리 기능
- 고급 검색/필터
- 통계 및 차트

### Phase 3 - 2주

- 보고서 생성
- 성능 최적화
- 배포 및 모니터링

## 12. 위험 요소 및 대응 방안

### 12.1 기술적 위험

- **위험**: 등록/미등록 데이터 통합 처리 복잡성
- **대응**: 단계별 구현 및 충분한 테스트

### 12.2 사용자 경험 위험

- **위험**: 미등록 차량 입력 과정의 복잡성
- **대응**: 운전자명만 필수 입력으로 단순화, 나머지 정보는 선택적 보완

### 12.3 데이터 품질 위험

- **위험**: 미등록 데이터 누적으로 인한 시스템 성능 저하
- **대응**: 정기적인 데이터 정리 프로세스 및 자동화 도구

## 13. 다음 단계

1. **데이터베이스 구축**: PostgreSQL 스키마 생성 및 초기 데이터 설정
2. **인증 시스템 구현**: JWT 기반 로그인 시스템
3. **핵심 CRUD 개발**: 사람, 차량, 작업 관리 기능
4. **통합 출입 기록 시스템**: 등록/미등록 차량 처리 로직
5. **VIP 및 FREE PASS UI**: 시각적 구분 시스템 구현
