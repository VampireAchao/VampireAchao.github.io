---
title: android进度条
date: 2020-12-14 21:47:24
tags: java
---

> 

> 为者败之，执者失之。——《道德经》

原生安卓实现的进度条

```java
package com.example.uidemo.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.SeekBar;
import android.widget.TextView;

import com.example.uidemo.R;

import java.math.BigDecimal;
import java.util.Locale;

public class ProgressBarActivity extends AppCompatActivity implements SeekBar.OnSeekBarChangeListener {

    private SeekBar seekBar;

    private ProgressBar progressBar1;

    private ProgressBar progressBar2;

    private TextView loadingText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_progress_bar);
        seekBar=findViewById(R.id.seek_bar);
        progressBar1=findViewById(R.id.progress_bar1);
        progressBar2=findViewById(R.id.progress_bar2);
        loadingText=findViewById(R.id.loading_text);
        seekBar.setOnSeekBarChangeListener(this);
    }


    @Override
    public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
        String per=progress+"%";
        if(progress==seekBar.getMax()){
            loadingText.setText("加载完成");
            progressBar1.setVisibility(View.GONE);
        }else{
            loadingText.setText("正在加载中("+per+")");
            progressBar1.setVisibility(View.VISIBLE);
            progressBar2.setProgress(progress);
        }

    }

    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {
//        int progress = seekBar.getProgress();
//        System.out.println(progress);
//        progressBar2.setProgress(progress);
    }

    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {
        progressBar2.setProgress(seekBar.getProgress());
    }



}
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".activity.ProgressBarActivity"
        >
        <LinearLayout
                android:id="@+id/linearLayout1"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                app:layout_constraintTop_toTopOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                android:orientation="horizontal"
                android:gravity="center"
                >
                <ProgressBar
                        android:id="@+id/progress_bar1"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        />
                <TextView
                        android:id="@+id/loading_text"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="正在加载中(0%)"
                        android:textSize="20dp"
                        />
        </LinearLayout>
        <LinearLayout
                android:id="@+id/linearLayout2"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                app:layout_constraintTop_toBottomOf="@id/linearLayout1"
                app:layout_constraintStart_toStartOf="parent"
                android:orientation="vertical"
                >
                <ProgressBar
                        android:id="@+id/progress_bar2"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        style="?android:attr/progressBarStyleHorizontal"
                        android:progress="0"
                        android:max="100"
                        />
                <SeekBar
                        android:id="@+id/seek_bar"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:max="100"
                        />
        </LinearLayout>
        <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@id/linearLayout2"
                android:text="1.滑动下面的滑杆后，上面的进度条同步\n2.滑动到最大值后最上方ProgressBar改变(隐藏)"
                />
</androidx.constraintlayout.widget.ConstraintLayout>
```

