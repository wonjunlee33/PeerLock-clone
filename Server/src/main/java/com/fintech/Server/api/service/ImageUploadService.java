package com.fintech.Server.api.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.fintech.Server.api.entity.ReservationEntity;
import com.fintech.Server.api.entity.ReservationImageEntity;
import com.fintech.Server.api.entity.StorageEntity;
import com.fintech.Server.api.entity.StorageImageEntity;
import com.fintech.Server.api.repository.ReservationImageRepository;
import com.fintech.Server.api.repository.ReservationRepository;
import com.fintech.Server.api.repository.StorageImageRepository;
import com.fintech.Server.api.repository.StorageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class ImageUploadService {

    @Autowired
    private StorageRepository storageRepository;

    @Autowired
    private StorageImageRepository storageImageRepository;

    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private ReservationImageRepository reservationImageRepository;

    @Value("${ncp.accessKey}")
    private String accessKey;

    @Value("${ncp.secretKey}")
    private String secretKey;

    @Value("${ncp.endpoint}")
    private String endpoint;

    @Value("${ncp.bucketName}")
    private String bucketName;


    public List<String> uploadImagesToNCP(MultipartFile[] images, Long id, String div) throws Exception {
        List<String> imageUrls = new ArrayList<>();

        Date currentDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd_HHmmss"); // 예: 20230819_233509
        String folderName = dateFormat.format(currentDate);

        if (div.equals("storage")) {
            StorageEntity storageEntity = storageRepository.findById(id).orElseThrow(() -> new Exception("Storage not found"));

            for (MultipartFile image : images) {
                String imageUrl = uploadSingleImageToNCP(image, folderName);

                // StroageImageEntity의 imagePath에 imageUrl 저장하기
                StorageImageEntity imageEntity = new StorageImageEntity();
                imageEntity.setImagePath(imageUrl);
                imageEntity.setStorage(storageEntity);
                storageImageRepository.save(imageEntity);

                imageUrls.add(imageUrl);
            }
        } else if (div.equals("reservation")) {
            ReservationEntity reservationEntity = reservationRepository.findById(id).orElseThrow(() -> new Exception("Reservation not found"));

            for (MultipartFile image : images) {
                String imageUrl = uploadSingleImageToNCP(image, folderName);

                ReservationImageEntity imageEntity = new ReservationImageEntity();
                imageEntity.setImagePath(imageUrl);
                imageEntity.setReservation(reservationEntity);
                reservationImageRepository.save(imageEntity);

                imageUrls.add(imageUrl);
            }
        }


        return imageUrls;
    }

    public String uploadSingleImageToNCP(MultipartFile image, String folderName) throws IOException {
        AmazonS3 s3Client = AmazonS3Client.builder()
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endpoint, "kr-standard"))
                .build();

        String fileName = folderName + "/" + UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(image.getContentType());
        metadata.setContentLength(image.getSize());
        metadata.setHeader("Content-Disposition", "inline;");

        PutObjectRequest putRequest = new PutObjectRequest(bucketName, fileName, image.getInputStream(), metadata)
                .withCannedAcl(CannedAccessControlList.PublicRead); // 이미지를 public으로 설정

        s3Client.putObject(putRequest);

        return endpoint + "/" + bucketName + "/" + fileName;
    }
}
